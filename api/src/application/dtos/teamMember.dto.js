class TeamMemberDto {
  constructor({ id, workspaceMemberId, workspaceId, teamId, role, addedAt }) {
    this.id = id;
    this.workspaceMemberId = workspaceMemberId,
    this.workspaceId = workspaceId;
    this.teamId = teamId;
    this.role = role;
    this.addedAt = addedAt
  }

  static withName(member){
    return {
      id: member.id,
      name: member?.workspaceMember?.user?.name || null,
      workspaceMemberId: member.workspaceMemberId,
      workspaceId: member.workspaceId,
      teamId: member.teamId,
      role: member.role,
      addedAt: member.addedAt
    }
  }
}

module.exports = TeamMemberDto;
