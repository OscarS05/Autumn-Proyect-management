const boom = require('@hapi/boom');
const logger = require('../../../../utils/logger/logger');

class DeleteWorkspaceUseCase {
  constructor({ workspaceRepository }, { WorkspaceRedis, WorkspaceMemberRedis, ProjectRedis }){
    this.workspaceRepository = workspaceRepository;

    this.WorkspaceRedis = WorkspaceRedis;
    this.WorkspaceMemberRedis = WorkspaceMemberRedis;
    this.ProjectRedis = ProjectRedis;
  }

  async execute(workspaceId, projects){
    const deletedWorkspace = await this.workspaceRepository.delete(workspaceId);
    if(deletedWorkspace === 0) throw boom.notFound('Workspace not found');

    try {
      await Promise.all([
        ...(projects ?? []).map(project => this.deleteProject.delete(project.id, project.workspaceId)),
        this.WorkspaceRedis.deleteWorkspace(workspaceId),
      ]);
    } catch (error) {
      logger.warn('❗Failed to delete the workspace in Redis. Error:', error);
    }
  }
}

module.exports = DeleteWorkspaceUseCase;
