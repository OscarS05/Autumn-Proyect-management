const boom = require('@hapi/boom');
const logger = require('../../../../utils/logger/logger');
const UpdateWorkspaceEntity = require("../../../domain/entities/UpdateWorkspaceEntity");
const WorkspaceDto = require('../../dtos/workspace.dto');

class UpdateWorkspaceUseCase {
  constructor({ workspaceRepository }){
    this.workspaceRepository = workspaceRepository;
  }

  async execute(workspaceId, workspaceData){
    const updateWorkspaceEntity = new UpdateWorkspaceEntity(workspaceData).toPlainObject();

    const [updatedRows, [updatedWorkspace]] = await this.workspaceRepository.update(workspaceId, updateWorkspaceEntity);
    if(updatedRows === 0) throw boom.notFound('Workspace not found');

    try {
      await this.redisModels.WorkspaceRedis.updateWorkspace(updatedWorkspace);
    } catch (error) {
      logger.warn('❗Failed to update the workspace in Redis. Error:', error);
    }

    return new WorkspaceDto(updatedWorkspace);
  }
}

module.exports = UpdateWorkspaceUseCase;
