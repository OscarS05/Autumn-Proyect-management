const logger = require('../../../../utils/logger/logger');

const WorkspaceEntity = require('../../../domain/entities/WorkspaceEntity');
const WorkspaceDto = require('../../dtos/workspace.dto');

class CreateWorkspaceUseCase {
  constructor({ workspaceRepository }){
    this.workspaceRepository = workspaceRepository;
  }

  async execute(workspaceData){
    const workspaceEntity = new WorkspaceEntity(workspaceData).toPlainObject();

    const { workspace, workspaceMember } = await this.workspaceRepository.create(workspaceEntity);

    return new WorkspaceDto(workspace);
  }
}

module.exports = CreateWorkspaceUseCase;
