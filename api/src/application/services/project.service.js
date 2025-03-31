const boom = require('@hapi/boom');

class ProjectService {
  constructor({ getProjectsByWorkspaceUseCase, countProjectsUseCase, createProjectUseCase, updateProjectUseCase, deleteProjecUseCase }) {
    this.getProjectsByWorkspaceUseCase = getProjectsByWorkspaceUseCase;
    this.countProjectsUseCase = countProjectsUseCase;
    this.createProjectUseCase = createProjectUseCase;
    this.updateProjectUseCase = updateProjectUseCase;
    this.deleteProjecUseCase = deleteProjecUseCase;
  }

  async create(projectData) {
    return await this.createProjectUseCase.execute(projectData);
  }

  async update(projectId, projectData) {
    return await this.updateProjectUseCase.execute(projectId, projectData);
  }

  async delete(projectId){
    return await this.deleteProjecUseCase.execute(projectId);
  }

  async findAllByWorkspace(workspaceId){
    return await this.getProjectsByWorkspaceUseCase.execute(workspaceId);
  }

  async countProjects(workspaceMember){
    return await this.countProjectsUseCase.execute(workspaceMember.id);
  }
}

module.exports = ProjectService;
