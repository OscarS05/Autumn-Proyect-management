const boom = require('@hapi/boom');

class WorkspaceService {
  constructor(
    { createWorkspaceUseCase, updateWorkspaceUseCase, countWorkspacesByUserUseCase, deleteWorkspaceUseCase, getWorkspacesAndProjectsUseCase },
    { getProjectsUseCase }
  ){
    // workspace use cases
    this.createWorkspaceUseCase = createWorkspaceUseCase;
    this.updateWorkspaceUseCase = updateWorkspaceUseCase;
    this.deleteWorkspaceUseCase = deleteWorkspaceUseCase;
    this.getWorkspacesAndProjectsUseCase = getWorkspacesAndProjectsUseCase;
    this.countWorkspacesByUserUseCase = countWorkspacesByUserUseCase;

    // project use cases
    this.getProjectsUseCase = getProjectsUseCase;
  }

  async createWorkspace(workspaceData) {
    return await this.createWorkspaceUseCase.execute(workspaceData);
  }

  async update(workspaceId, data) {
    return await this.updateWorkspaceUseCase.execute(workspaceId, data);
  }

  async delete(workspaceId){
    const projects = await this.getProjectsUseCase.execute(workspaceId);
    return await this.deleteWorkspaceUseCase.execute(workspaceId, projects);
  }

  async findWorkspaceAndItsProjects(workspaceId, userId){
    try {
      const Workspace = await this.models.Workspace.findAll({
        where: { id: workspaceId },
        include: [{ model: this.models.Project, as: 'projects' }]
      });

      await this.redisModels.WorkspaceRedis.saveWorkspaces(userId, Workspace);
      return Workspace;
    } catch (error) {
      return boom.badRequest(error.message || 'Failed to find the workspace and its projects');
    }
  }

  async getWorkspacesAndProjects(userId) {
    return await this.getWorkspacesAndProjectsUseCase.execute(userId);
  }

  async countWorkspacesByUserId(userId){
    return await this.countWorkspacesByUserUseCase.execute(userId);
  }
}

module.exports = WorkspaceService;
