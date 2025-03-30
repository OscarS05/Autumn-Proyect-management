const boom = require('@hapi/boom');

class TransferOwnershipUseCase {
  constructor({ workspaceMemberRepository }){
    this.workspaceMemberRepository = workspaceMemberRepository;
  }

  async execute(currentOwner, newOwner){
    if(currentOwner.workspaceId !== newOwner.workspaceId) throw boom.conflict('The new owner does not belong to the workspace');
    return await this.workspaceMemberRepository.transferOwnership(currentOwner, newOwner);
  }
}

module.exports = TransferOwnershipUseCase;
