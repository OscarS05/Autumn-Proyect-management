const boom = require('@hapi/boom');

class WorkspaceMemberService {
  constructor({
      getWorkspaceMemberByIdUseCase,
      getWorkspaceMemberByUserIdUseCase,
      addMemberToWorkspaceUseCase,
      getWorkspaceMembersWithDataUseCase,
      getWorkspaceMembersUseCase,
      updateRoleUseCase,
      transferOwnershipUseCase,
      removeWorkspaceMemberUseCase
    }, { getProjectsByWorkspaceMemberUseCase }) {
    this.getWorkspaceMemberByIdUseCase = getWorkspaceMemberByIdUseCase;
    this.getWorkspaceMemberByUserIdUseCase = getWorkspaceMemberByUserIdUseCase;
    this.getWorkspaceMembersWithDataUseCase = getWorkspaceMembersWithDataUseCase;
    this.getWorkspaceMembersUseCase = getWorkspaceMembersUseCase;
    this.addMemberToWorkspaceUseCase = addMemberToWorkspaceUseCase;
    this.updateRoleUseCase = updateRoleUseCase;
    this.transferOwnershipUseCase = transferOwnershipUseCase;
    this.removeWorkspaceMemberUseCase = removeWorkspaceMemberUseCase;

    this.getProjectsByWorkspaceMemberUseCase = getProjectsByWorkspaceMemberUseCase;
  }

  async addMemberToWorkspace(workspaceId, userIdToAdd){
    const workspaceMember = await this.getWorkspaceMemberByUserId(workspaceId, userIdToAdd);
    if(workspaceMember) throw boom.conflict('User is already a member of this workspace');

    return await this.addMemberToWorkspaceUseCase.execute(workspaceId, userIdToAdd);
  }

  async updateRole(workspaceId, WorkspaceMemberIdToUpdate, newRole){
    const workspaceMember = await this.getWorkspaceMemberById(WorkspaceMemberIdToUpdate);
    if(!workspaceMember?.id) throw boom.notFound('The workspace member to update the role does not exist');
    return await this.updateRoleUseCase.execute(workspaceId, workspaceMember, newRole);
  }

  async removeMember(requesterAsWorkspaceMember, workspaceMemberId){
    const [ workspaceMemberToBeRemoved, workspaceMembers ] = await Promise.all([
      this.getWorkspaceMemberById(workspaceMemberId),
      this.findAll(requesterAsWorkspaceMember.workspaceId),
    ]);

    if(!workspaceMemberToBeRemoved?.id) throw boom.notFound('The workspace member to be removed was not found');
    const projectsWithMembers = await this.getProjectsByWorkspaceMemberUseCase.execute(
      workspaceMemberToBeRemoved.workspaceId,
      workspaceMemberToBeRemoved.id
    );

    return await this.removeWorkspaceMemberUseCase.execute(
      requesterAsWorkspaceMember,
      workspaceMemberToBeRemoved,
      workspaceMembers,
      projectsWithMembers
    );
  }

  async transferOwnership(currentOwner, newOwnerId){
    const newOwner = await this.getWorkspaceMemberById(newOwnerId);
    if(!newOwner?.id) throw boom.notFound('New owner does not exist');
    return await this.transferOwnershipUseCase.execute(currentOwner, newOwner);
  }

  async findAllWithData(workspaceId){
    return await this.getWorkspaceMembersWithDataUseCase.execute(workspaceId);
  }

  async findAll(workspaceId){
    return await this.getWorkspaceMembersUseCase.execute(workspaceId);
  }

  async getWorkspaceMemberByUserId(workspaceId, userId){
    return await this.getWorkspaceMemberByUserIdUseCase.execute(workspaceId, userId);
  }

  async getWorkspaceMemberById(WorkspaceMemberId){
    return await this.getWorkspaceMemberByIdUseCase.execute(WorkspaceMemberId);
  }
}

module.exports = WorkspaceMemberService;
