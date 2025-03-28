class ProjectDto {
  constructor({ id, name, visibility, workspaceId, workspaceMemberId, createdAt }) {
    this.id = id;
    this.name = name;
    this.visibility = visibility;
    this.workspaceId = workspaceId;
    this.workspaceMemberId = workspaceMemberId;
    this.createdAt = createdAt
  }

  static fromEntity(project){
    return {
      id: project.id,
      name: project.name,
      visibility: project.visibility,
      workspaceId: project.workspaceId,
      access: project.access || false,
    }
  }
}

module.exports = ProjectDto;
