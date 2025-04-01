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

  async findByWorkspaceMember(workspaceMemberId){
    throw boom.notImplemented('the findByWorkspaceMember() method is not implemented');
  }

  async findByUser(userId, workspaceId, projectId){
    throw boom.notImplemented('the findByUser(userId, workspaceId, projectId) method is not implemented');
  }

  async findAll(workspaceMemberId){
    throw boom.notImplemented('the findAll(workspaceMemberId) method is not implemented');
  }

  async findAllByProject(projectId){
    throw boom.notImplemented('the findAll(projectId) method is not implemented');
  }

  async findProjectWithItsMembersAndTeams(projectId){
    throw boom.notImplemented('the findProjectWithItsMembersAndTeams(projectId) method is not implemented');
  }
}

module.exports = IProjectMemberRepository;
