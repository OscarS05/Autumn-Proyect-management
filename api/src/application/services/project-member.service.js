const boom = require("@hapi/boom");

class ProjectMemberService {
  constructor({
      getProjectMemberByUserUseCase,
      getProjectMemberByWorkspaceMemberUseCase,
      getProjectWithItsMembersAndTeamsUseCase,
      getMemberByIdUseCase,
      getProjectMembersByProjectUseCase,
      addMemberToProjectUseCase,
      updateRoleUseCase,
      transferOwnershipUseCase,
      removeMemberUseCase,
      checkProjectMembershipByUserUseCase,
    }
  ){
    this.getProjectMemberByUserUseCase = getProjectMemberByUserUseCase;
    this.getProjectMemberByWorkspaceMemberUseCase = getProjectMemberByWorkspaceMemberUseCase;
    this.getProjectWithItsMembersAndTeamsUseCase = getProjectWithItsMembersAndTeamsUseCase;
    this.getMemberByIdUseCase = getMemberByIdUseCase;
    this.getProjectMembersByProjectUseCase = getProjectMembersByProjectUseCase;
    this.addMemberToProjectUseCase = addMemberToProjectUseCase;
    this.updateRoleUseCase = updateRoleUseCase;
    this.transferOwnershipUseCase = transferOwnershipUseCase;
    this.removeMemberUseCase = removeMemberUseCase;
    this.checkProjectMembershipByUserUseCase = checkProjectMembershipByUserUseCase;
  }

  async addMemberToProject(projectId, workspaceMemberId){
    const memberToBeAdded = await this.getProjectMemberByWorkspaceMemberUseCase.execute(workspaceMemberId, projectId);
    if(memberToBeAdded?.id) throw boom.conflict('The workspace member is already a member if the project');
    return await this.addMemberToProjectUseCase.execute(projectId, workspaceMemberId);
  }

  async updateRole(projectId, projectMemberId, newRole){
    const memberToBeUpdated = await this.getProjectMemberById(projectMemberId);
    if(!memberToBeUpdated?.id) throw boom.notFound('The project member does not exist in the project');
    return await this.updateRoleUseCase.execute(memberToBeUpdated, newRole);
  }

  async transferOwnership(projectId, currentProjectOwner, newProjectOwnerId){
    const newProjectOwner = await this.getProjectMemberById(newProjectOwnerId);
    if(!newProjectOwner?.id) throw boom.notFound('The member to be updated as project owner does not exist in the project');
    return await this.transferOwnershipUseCase.execute(projectId, currentProjectOwner, newProjectOwner);
  }

  async removeMemberController(projectId, projectMemberId, requesterAsProjectMember){
    const [ memberTobeRemoved, projectMembers ] = await Promise.all([
      this.getProjectMemberById(projectMemberId),
      this.getProjectMembers(projectId),
    ]);
    if(!memberTobeRemoved?.id) throw boom.notFound('The member to be removed was not found in the project');
    return await this.removeMemberUseCase.execute(requesterAsProjectMember, memberTobeRemoved, projectMembers);
  }

  async getProjectMembers(projectId){
    return await this.getProjectMembersByProjectUseCase.execute(projectId);
  }

  async getProjectMembersWithTeams(projectId){
    return await this.getProjectWithItsMembersAndTeamsUseCase.execute(projectId);
  }

  async getProjectMemberByUserId(userId, workspaceId, projectId){
    return await this.getProjectMemberByUserUseCase.execute(userId, workspaceId, projectId);
  }

  async getProjectMemberById(projectMemberId){
    return await this.getMemberByIdUseCase.execute(projectMemberId);
  }

  async checkProjectMembershipByUser(userId, projectId){
    return await this.checkProjectMembershipByUserUseCase.execute(userId, projectId);
  }
}

module.exports = ProjectMemberService;
