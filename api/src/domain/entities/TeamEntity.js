const { v4: uuidv4 } = require('uuid');

const TeamName = require('../value-objects/teamName');

class TeamEntity {
  constructor({ name, workspaceId, workspaceMemberId, createdAt }) {
    this.id = uuidv4();
    this.name = new TeamName(name).value;
    this.workspaceId = workspaceId;
    this.workspaceMemberId = workspaceMemberId;
    this.createdAt = createdAt || new Date().toISOString();
  }
}

module.exports = TeamEntity;
