const boom = require('@hapi/boom');

class IProjectMemberRepository {
  async create(projectMemberEntity){
    throw boom.notImplemented('the create() method is not implemented');
  }
  async updateRole(projectMemberId, newRole){
    throw boom.notImplemented('the updateRole() method is not implemented');
  }

  async transferOwnership(currentOwner, newOwner){
    throw boom.notImplemented('the transferOwnership() method is not implemented');
  }

  async delete(projectMemberId){
    throw boom.notImplemented('the crdeleteeate() method is not implemented');
  }

  async findAll(projectId){
    throw boom.notImplemented('the findAll() method is not implemented');
  }
}

module.exports = IProjectMemberRepository;
