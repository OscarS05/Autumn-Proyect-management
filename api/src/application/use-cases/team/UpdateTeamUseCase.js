const TeamName = require("../../../domain/value-objects/teamName");
const TeamDto = require("../../dtos/team.dto");

class UpdateTeamUseCase {
  constructor({ teamRepository }){
    this.teamRepository = teamRepository;
  }

  async execute(teamId, name){
    const teamNameVO = new TeamName(name).value;
    const [ updatedRows , [ updatedTeam ] ] = await this.teamRepository.update(teamId, { name: teamNameVO });
    if(updatedRows === 0) throw boom.badRequest('The update team operation updated zero rows');

    return new TeamDto(updatedTeam);
  }
}

module.exports = UpdateTeamUseCase;
