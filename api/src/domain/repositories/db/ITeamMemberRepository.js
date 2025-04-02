const boom = require('@hapi/boom');

class ITeamMemberRepository {
  async create(teamMemberEntity){
    throw boom.notImplemented('the create() method is not implemented');
  }
  async updateRole(teamMemberId, newRole){
    throw boom.notImplemented('the updateRole(teamMemberId, newRole) method is not implemented');
  }

  async transferOwnership(currentOwner, newOwner){
    throw boom.notImplemented('the transferOwnership(currentOwner, newOwner) method is not implemented');
  }

  async delete(teamMemberId){
    throw boom.notImplemented('the delete(teamMemberId) method is not implemented');
  }

  async findAll(teamId, workspaceId){
    throw boom.notImplemented('the findAll(teamId, workspaceId) method is not implemented');
  }

  async findOneByUserId(userId, workspaceId, teamId){
    throw boom.notImplemented('the findOneByUserId(userId, workspaceId, teamId) method is not implemented');
  }
}

module.exports = ITeamMemberRepository;
