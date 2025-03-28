const boom = require('@hapi/boom');

class IWorkspaceCacheRepository {
  async saveWorkspaces(userId, workspaces){
    throw boom.notImplemented('The method saveWorkspaces() is not implemented in cache');
  }

  async updateWorkspace(workspace){
    throw boom.notImplemented('The method updateWorkspace() is not implemented in cache');
  }

  async deleteWorkspace(workspaceId, userId, workspaceMembersIds){
    throw boom.notImplemented('The method deleteWorkspace() is not implemented in cache');
  }

  async getWorkspaceAndItsProjects(workspaceId, userId){
    throw boom.notImplemented('The method getWorkspaceAndItsProjects() is not implemented in cache');
  }

  async getWorkspacesAndProjects(userId){
    throw boom.notImplemented('The method getWorkspacesAndProjects() is not implemented in cache');
  }

  async getUserWorkspaceMemberIds(userId){
    throw boom.notImplemented('The method getUserWorkspaceMemberIds() is not implemented in cache');
  }

  async getWorkspacesIdsByUser(userId){
    throw boom.notImplemented('The method getWorkspacesIdsByUser() is not implemented in cache');
  }

  async getWorkspacesAndProjectsIds(workspacesIds){
    throw boom.notImplemented('The method getWorkspacesAndProjectsIds() is not implemented in cache');
  }
}

module.exports = IWorkspaceCacheRepository;
