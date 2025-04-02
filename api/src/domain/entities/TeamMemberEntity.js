const { v4: uuidv4 } = require('uuid');

class TeamMemberEntity {
  constructor({ workspaceMemberId, role, workspaceId, teamId, addedAt }) {
    this.id = uuidv4();
    this.workspaceMemberId = workspaceMemberId;
    this.role = role || 'member';
    this.workspaceId = workspaceId;
    this.teamId = teamId;
    this.addedAt = addedAt || new Date().toISOString();
  }
}

module.exports = TeamMemberEntity;
