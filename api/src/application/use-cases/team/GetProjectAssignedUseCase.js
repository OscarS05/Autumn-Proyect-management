class GetProjectAssignedUseCase {
  constructor({ teamRepository }){
    this.teamRepository = teamRepository;
  }

  async execute(teamId, projectId){
    return await this.teamRepository.findProjectAssigned(teamId, projectId);
  }
}

module.exports = GetProjectAssignedUseCase;
