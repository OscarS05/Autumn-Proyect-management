class WorkspaceMemberDto {
  constructor({ id, userId, workspaceId, role, addedAt }) {
    this.id = id;
    this.userId = userId;
    this.workspaceId = workspaceId;
    this.role = role;
    this.addedAt = addedAt
  }
}

module.exports = WorkspaceMemberDto;
