class DeleteProjectUseCase {
  constructor({ projectRepository }){
    this.projectRepository = projectRepository;
  }

  async execute(projectId){
    return await this.projectRepository.delete(projectId);
  }
}

module.exports = DeleteProjectUseCase;
