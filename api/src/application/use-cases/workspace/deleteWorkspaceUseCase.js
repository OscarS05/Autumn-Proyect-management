const boom = require('@hapi/boom');
const logger = require('../../../../utils/logger/logger');

class DeleteWorkspaceUseCase {
  constructor({ workspaceRepository }){
    this.workspaceRepository = workspaceRepository;
  }

  async execute(workspaceId){
    const deletedWorkspace = await this.workspaceRepository.delete(workspaceId);
    if(deletedWorkspace === 0) throw boom.notFound('Workspace not found');

    return deletedWorkspace;
  }
}

module.exports = DeleteWorkspaceUseCase;
