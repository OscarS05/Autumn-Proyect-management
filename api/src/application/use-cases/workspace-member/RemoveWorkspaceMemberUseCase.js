const boom = require('@hapi/boom');
const logger = require('../../../../utils/logger/logger');

class RemoveWorkspaceMemberUseCase {
  constructor({ workspaceMemberRepository, projectMemberRepository, workspaceRepository }){
    this.workspaceMemberRepository = workspaceMemberRepository;
    this.projectMemberRepository = projectMemberRepository;
    this.workspaceRepository = workspaceRepository;
  }

  async deleteWorkspaceMember(workspaceMemberId){
    return await this.workspaceMemberRepository.delete(workspaceMemberId);
  }

  async execute(requesterAsWorkspaceMember, workspaceMemberToBeRemoved, workspaceMembers, projectsOfMemberToBeRemoved){
    if(requesterAsWorkspaceMember.workspaceId !== workspaceMemberToBeRemoved.workspaceId){
      throw boom.conflict('The workspace member to be removed does not belong to the workspace');
    }
    if(requesterAsWorkspaceMember.role !== 'owner' && workspaceMemberToBeRemoved.role === 'owner'){
      throw boom.forbidden("You cannot remove the owner");
    }
    if(requesterAsWorkspaceMember.role === 'member' && workspaceMemberToBeRemoved.role === 'member'){
      throw boom.forbidden('You cannot remove another member');
    }

    if(projectsOfMemberToBeRemoved.length >= 1){
      await this.removeMemberWithProjects(workspaceMemberToBeRemoved, workspaceMembers, projectsOfMemberToBeRemoved);
    }
    if(requesterAsWorkspaceMember.id === workspaceMemberToBeRemoved.id){
      return await this.leaveTheWorkspace(workspaceMemberToBeRemoved, workspaceMembers);
    } else {
      return await this.deleteWorkspaceMember(workspaceMemberToBeRemoved.id);
    }
  }

  async removeMemberWithProjects(workspaceMemberToBeRemoved, workspaceMembers, projectsOfMemberToBeRemoved){
    const projectsWithOnlyOwner = projectsOfMemberToBeRemoved.filter(project => project.projectMembers.length === 1);
    if(projectsWithOnlyOwner.length > 0 && workspaceMembers.length > 1){
      throw boom.forbidden(`You must assign a new member before leaving the workspace. In the project: ${projectsWithOnlyOwner.map(p => p.name).join(', ')}`);
    }

    const projectsWhichMemberIsOwner = projectsOfMemberToBeRemoved.filter(project => project.workspaceMemberId === workspaceMemberToBeRemoved.id);
    if(!projectsWhichMemberIsOwner.length === 0) return;

    const results = await Promise.allSettled(projectsOfMemberToBeRemoved.map(async (project) => {
      const availableMembers = project.projectMembers.filter(projectMember => projectMember.workspaceMemberId !== workspaceMemberToBeRemoved.id);
      if (availableMembers.length === 0) {
        throw boom.forbidden(`Cannot remove the member. No project members available to take ownership of project: ${project.name}`);
      }
      await this.projectMemberRepository.transferOwnership(project.id, workspaceMemberToBeRemoved, availableMembers[0]);
    }));

    const errors = results.filter(r => r.status === "rejected").map(r => r.reason.message);
    if (errors.length > 0) {
      logger.info(`❗Some projects failed to transfer ownership: ${errors.join('; ')}`);
    }

    return results;
  }

  async leaveTheWorkspace(requesterAsWorkspaceMember, workspaceMembers){
    if(requesterAsWorkspaceMember.role === 'owner'){
      return await this.handleOwnerExit(requesterAsWorkspaceMember, workspaceMembers);
    } else if(requesterAsWorkspaceMember.role !== 'owner') {
      return await this.deleteWorkspaceMember(requesterAsWorkspaceMember.id);
    }
  }

  async handleOwnerExit(requesterAsWorkspaceMember, workspaceMembers){
    const isTheOnlyMember = workspaceMembers.length === 1 && workspaceMembers[0].role === 'owner'
    if(isTheOnlyMember){
      return await this.workspaceRepository.delete(requesterAsWorkspaceMember.workspaceId);
    } else if(workspaceMembers.length > 1){
      const { admins, members } = workspaceMembers.reduce((acc, member) => {
        if(member.role !== 'owner'){
          if(member.role === 'admin'){
            acc.admins.push(member);
          } else if(member.role === 'member'){
            acc.members.push(member);
          }
        }
        return acc;
      }, { admins: [], members: [] });

      if(admins.length > 0){
        await this.workspaceMemberRepository.transferOwnership(requesterAsWorkspaceMember, admins[0]);
      } else if(members.length > 0){
        await this.workspaceMemberRepository.transferOwnership(requesterAsWorkspaceMember, members[0]);
      }
      return await this.deleteWorkspaceMember(requesterAsWorkspaceMember.id);
    }
  }
}

module.exports = RemoveWorkspaceMemberUseCase;
