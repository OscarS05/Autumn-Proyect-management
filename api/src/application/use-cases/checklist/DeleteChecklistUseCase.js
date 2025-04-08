class DeleteChecklistUseCase {
  constructor({ checklistRepository }){
    this.checklistRepository = checklistRepository;
  }

  async execute(checklistId){
    return await this.checklistRepository.delete(checklistId);
  }
}

module.exports = DeleteChecklistUseCase;
