class DeleteChecklistItemUseCase {
  constructor({ checklistItemRepository }){
    this.checklistItemRepository = checklistItemRepository;
  }

  async execute(checklistItemId){
    return await this.checklistItemRepository.delete(checklistItemId);
  }
}

module.exports = DeleteChecklistItemUseCase;
