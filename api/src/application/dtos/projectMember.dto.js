class ProjectMemberDto {
  constructor({ id, workspaceMemberId, projectId, role, addedAt }) {
    this.id = id;
    this.workspaceMemberId = workspaceMemberId,
    this.projectId = projectId;
    this.role = role;
    this.addedAt = addedAt
  }

  static withProject(projectMember){
    const ProjectDto = require('./project.dto');

    return {
      id: projectMember.id,
      workspaceMemberId: projectMember.workspaceMemberId,
      projectId: projectMember.projectId,
      role: projectMember.role,
      project: new ProjectDto(projectMember.project),
    }
  }
}

module.exports = ProjectMemberDto;
