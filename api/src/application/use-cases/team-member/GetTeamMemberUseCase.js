const TeamMemberDto = require("../../dtos/teamMember.dto");

class GetTeamMemberUseCase{
  constructor({ teamMemberRepository }){
    this.teamMemberRepository = teamMemberRepository;
  }

  async execute(userId, workspaceId, teamId){
    const teamMember = await this.teamMemberRepository.findOneByUserId(userId, workspaceId, teamId);
    return new TeamMemberDto(teamMember);
  }
}

module.exports = GetTeamMemberUseCase;
