const boom = require('@hapi/boom');

class IWorkspaceMemberRepository {
  async create(workspaceEntity){
    throw boom.notImplemented('the create() method is not implemented');
  }

  async update(workspaceEntity){
    throw boom.notImplemented('the update() method is not implemented');
  }

  async delete(workspaceMemberId){
    throw boom.notImplemented('the delete() method is not implemented');
  }

  async findMemberByUserId(userId){
    throw boom.notImplemented('the findMemberByUserId() method is not implemented');
  }

  async findWorkspaceMemberById(workspaceMemberId){
    throw boom.notImplemented('the findMemberByUserId() method is not implemented');
  }

  async findAll(workspaceId){
    throw boom.notImplemented('the findAll() method is not implemented');
  }
}

module.exports = IWorkspaceMemberRepository;
