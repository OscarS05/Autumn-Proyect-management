const logger = require('../../../../utils/logger/logger');

const WorkspaceEntity = require('../../../domain/entities/WorkspaceEntity');
const WorkspaceDto = require('../../dtos/workspace.dto');

class CreateWorkspaceUseCase {
  constructor({ workspaceRepository }, { WorkspaceRedis, WorkspaceMemberRedis }){
    this.workspaceRepository = workspaceRepository;
    this.WorkspaceRedis = WorkspaceRedis;
    this.WorkspaceMemberRedis = WorkspaceMemberRedis;
  }

  async execute(workspaceData){
    const workspaceEntity = new WorkspaceEntity(workspaceData).toPlainObject();

    const { workspace, workspaceMember } = await this.workspaceRepository.create(workspaceEntity);

    try {
      await Promise.all([
        this.WorkspaceRedis.saveWorkspace(workspace.userId, workspace),
        this.WorkspaceMemberRedis.saveWorkspaceMember(workspace.userId, workspace.id, workspaceMember.id),
      ]);
    } catch (error) {
      logger.warn('❗Failed to save workspace in Redis: ', error);
    }

    return new WorkspaceDto(workspace);
  }
}

module.exports = CreateWorkspaceUseCase;
