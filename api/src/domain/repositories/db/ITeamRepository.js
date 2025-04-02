const boom = require('@hapi/boom');

class ITeamRepository {
  async create(teamEntity){
    throw boom.notImplemented('the create(teamEntity) method is not implemented');
  }

  async update(id, teamName){
    throw boom.notImplemented('the update(id, teamName) method is not implemented');
  }

  async delete(teamId){
    throw boom.notImplemented('the delete(teamId) method is not implemented');
  }

  async findById(teamId){
    throw boom.notImplemented('the findById(teamId) method is not implemented');
  }

  async findAllByWorkspace(workspaceId){
    throw boom.notImplemented('the findAllByWorkspace(workspaceId) method is not implemented');
  }

  async findAllByWorkspaceMember(workspaceMemberId){
    throw boom.notImplemented('the findAllByWorkspaceMember(workspaceMemberId) method is not implemented');
  }

  async countTeams(workspaceMemberId){
    throw boom.notImplemented('the countTeams(workspaceMemberId) method is not implemented');
  }
}

module.exports = ITeamRepository;
