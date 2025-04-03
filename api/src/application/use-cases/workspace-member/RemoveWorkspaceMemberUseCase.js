const boom = require('@hapi/boom');
const logger = require('../../../../utils/logger/logger');

class RemoveWorkspaceMemberUseCase {
  constructor({ workspaceMemberRepository, projectMemberRepository, workspaceRepository, teamMemberRepository }){
    this.workspaceMemberRepository = workspaceMemberRepository;
    this.projectMemberRepository = projectMemberRepository;
    this.workspaceRepository = workspaceRepository;
    this.teamMemberRepository = teamMemberRepository;
  }

  async deleteWorkspaceMember(workspaceMemberId){
    return await this.workspaceMemberRepository.delete(workspaceMemberId);
  }

  async execute(requesterAsWorkspaceMember, workspaceMemberToBeRemoved, workspaceMembers, projectsOfMemberToBeRemoved, teamsOfMemberToBeRemoved){
    if(requesterAsWorkspaceMember.workspaceId !== workspaceMemberToBeRemoved.workspaceId){
      throw boom.conflict('The workspace member to be removed does not belong to the workspace');
    }
    if(requesterAsWorkspaceMember.role !== 'owner' && workspaceMemberToBeRemoved.role === 'owner'){
      throw boom.forbidden("You cannot remove the owner");
    }
    if(requesterAsWorkspaceMember.role === 'member' && workspaceMemberToBeRemoved.role === 'member'){
      throw boom.forbidden('You cannot remove another member');
    }

    if(teamsOfMemberToBeRemoved.length >= 1){
      await this.removeMemberWithTeams(workspaceMemberToBeRemoved, workspaceMembers, teamsOfMemberToBeRemoved);
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

  async removeMemberWithTeams(workspaceMemberToBeRemoved, workspaceMembers, teamsOfMemberToBeRemoved){
    const teamsWithOnlyOwner = teamsOfMemberToBeRemoved.filter(team => team.members.length === 1);
    if (teamsWithOnlyOwner.length > 0 && workspaceMembers.length > 1) {
      throw boom.forbidden(`You must assign a new team member before leaving the workspace. In the team: ${teamsWithOnlyOwner.map(t => t.name).join(', ')}`);
    }

    const teamsWhichMemberIsOwner = teamsOfMemberToBeRemoved.filter(team => team.workspaceMemberId === workspaceMemberToBeRemoved.id);
    if (teamsWhichMemberIsOwner.length === 0) return;

    const results = await Promise.allSettled(teamsWhichMemberIsOwner.map(async (team) => {
      const currentTeamOwner = team.members.find(teamMember => teamMember.workspaceMemberId === workspaceMemberToBeRemoved.id);
      const availableMembers = team.members.filter(teamMember => teamMember.workspaceMemberId !== workspaceMemberToBeRemoved.id);
      if (availableMembers.length === 0) {
      throw boom.forbidden(`Cannot remove the member. No team members available to take ownership of team: ${team.name}`);
      }

      await this.teamMemberRepository.transferOwnership(team.id, currentTeamOwner, availableMembers[0]);
    }));

    const errors = results.filter(r => r.status === "rejected").map(r => r.reason.message);
    if (errors.length > 0) {
      logger.info(`❗Some teams failed to transfer ownership: ${errors.join('; ')}`);
    }

    return results;
  }

  async removeMemberWithProjects(workspaceMemberToBeRemoved, workspaceMembers, projectsOfMemberToBeRemoved){
    const projectsWithOnlyOwner = projectsOfMemberToBeRemoved.filter(project => project.projectMembers.length === 1);
    if(projectsWithOnlyOwner.length > 0 && workspaceMembers.length > 1){
      throw boom.forbidden(`You must assign a new project member before leaving the workspace. In the project: ${projectsWithOnlyOwner.map(p => p.name).join(', ')}`);
    }

    const projectsWhichMemberIsOwner = projectsOfMemberToBeRemoved.filter(project => project.workspaceMemberId === workspaceMemberToBeRemoved.id);
    if(projectsWhichMemberIsOwner.length === 0) return;

    const results = await Promise.allSettled(projectsWhichMemberIsOwner.map(async (project) => {
      const currentProjectOwner = project.projectMembers.find(projectMember => projectMember.workspaceMemberId === workspaceMemberToBeRemoved.id);
      const availableMembers = project.projectMembers.filter(projectMember => projectMember.workspaceMemberId !== workspaceMemberToBeRemoved.id);
      if (availableMembers.length === 0) {
        throw boom.forbidden(`Cannot remove the member. No project members available to take ownership of project: ${project.name}`);
      }
      await this.projectMemberRepository.transferOwnership(project.id, currentProjectOwner, availableMembers[0]);
    }));

    const errors = results.filter(r => r.status === "rejected").map(r => r.reason.message);
    if (errors.length > 0) {
      logger.info(`❗Some projects failed to transfer ownership: ${errors.join('; ')}`);
    }

    return results;
  }

  async leaveTheWorkspace(requesterAsWorkspaceMember, workspaceMembers){
    return requesterAsWorkspaceMember.role === 'owner'
      ? await this.handleOwnerExit(requesterAsWorkspaceMember, workspaceMembers)
      : await this.deleteWorkspaceMember(requesterAsWorkspaceMember.id)
  }

  async handleOwnerExit(requesterAsWorkspaceMember, workspaceMembers){
    if(workspaceMembers.length === 1 && workspaceMembers[0].role === 'owner'){
      return await this.workspaceRepository.delete(requesterAsWorkspaceMember.workspaceId);
    }

    let admins = [];
    let members = [];

    for (const member of workspaceMembers) {
      if(member.role === 'admin') admins.push(member);
      if(member.role === 'member') members.push(member);
    }

    const newWorkspaceMember = admins.length > 0 ? admins[0] : members.length > 0 ? members[0] : null;
    if(!newWorkspaceMember) throw boom.badImplementation('No suitable member found to transfer project ownership');

    await this.workspaceMemberRepository.transferOwnership(requesterAsWorkspaceMember, newWorkspaceMember);
    return await this.deleteWorkspaceMember(requesterAsWorkspaceMember.id);
  }
}

module.exports = RemoveWorkspaceMemberUseCase;
