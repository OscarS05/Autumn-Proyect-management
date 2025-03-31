const { v4: uuidv4 } = require('uuid');

class ProjectMemberEntity {
  constructor({ workspaceMemberId, role, id: projectId, addedAt }) {
    this.id = uuidv4();
    this.workspaceMemberId = workspaceMemberId;
    this.role = role || 'member';
    this.projectId = projectId;
    this.addedAt = addedAt || new Date().toISOString();
  }
}

module.exports = ProjectMemberEntity;
