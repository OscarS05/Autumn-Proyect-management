const ProjectDto = require("./project.dto");

class WorkspaceDto {
  constructor({ id, name, description, userId, createdAt }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.userId = userId;
    this.createdAt = createdAt
  }

  static fromEntity(workspace, userId){
    return {
      id: workspace.id,
      name: workspace.name,
      userId: workspace.userId,
      role: workspace.role ? workspace.role : workspace.userId === userId || 'member',
      projects: workspace.projects ? workspace.projects.map(ProjectDto.fromEntity) : [],
    };
  }
}

module.exports = WorkspaceDto;
