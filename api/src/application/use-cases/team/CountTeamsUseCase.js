class CountTeamsUseCase{
  constructor({ teamRepository }){
    this.teamRepository = teamRepository;
  }

  async execute(workspaceMemberId){
    return await this.teamRepository.countTeams(workspaceMemberId);
  }
}

module.exports = CountTeamsUseCase;
