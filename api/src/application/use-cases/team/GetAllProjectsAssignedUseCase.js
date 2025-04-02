class GetAllProjectsAssignedUseCase {
  constructor({ teamRepository }){
    this.teamRepository = teamRepository;
  }

  async execute(teamId){
    return await this.teamRepository.findAllProjectsAssigned(teamId);
  }
}

module.exports = GetAllProjectsAssignedUseCase;
