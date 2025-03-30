const { v4: uuidv4 } = require('uuid');

class WorkspaceEntity {
  constructor({ workspaceId, role, userId, addedAt }) {
    this.id = uuidv4();
    this.workspaceId = workspaceId;
    this.role = role || 'member';
    this.userId = userId;
    this.addedAt = addedAt || new Date().toISOString();
  }
}

module.exports = WorkspaceEntity;
