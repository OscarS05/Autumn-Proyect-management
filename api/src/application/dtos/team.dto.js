class TeamDto {
  constructor({ id, name, workspaceMemberId, workspaceId, createdAt }){
    this.id = id;
    this.name = name;
    this.workspaceMemberId = workspaceMemberId;
    this.workspaceId = workspaceId;
    this.createdAt = createdAt;
  }

  static fromModel(team, projectMembers) {
    return {
      id: team.id,
      name: team.name,
      members: team.teamMembers.map(teamMember => ({
        id: teamMember.workspaceMember.id,
        name: teamMember.workspaceMember.user.name,
        role: teamMember.role,
        isMemberProject: projectMembers.some(pm => pm.workspaceMemberId === teamMember.workspaceMemberId)
      }))
    };
  }
}

module.exports = TeamDto;
