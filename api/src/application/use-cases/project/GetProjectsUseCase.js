const ProjectDto = require('../../dtos/project.dto');

class GetProjectsUseCase {
  constructor({ projectRepository }){
    this.projectRepository = projectRepository;
  }

  async execute(workspaceId){
    const projects = await this.projectRepository.findAll(workspaceId);
    return projects.map(project => new ProjectDto(project));
  }
}

module.exports = GetProjectsUseCase;
