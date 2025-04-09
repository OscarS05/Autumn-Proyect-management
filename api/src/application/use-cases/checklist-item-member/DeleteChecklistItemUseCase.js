class DeleteChecklistItemUseCase {
  constructor({ checklistItemMemberRepository }){
    this.checklistItemMemberRepository = checklistItemMemberRepository;
  }

  async execute(checklistItemId, projectMemberId){
    return await this.checklistItemMemberRepository.delete(checklistItemId, projectMemberId);
  }
}

module.exports = DeleteChecklistItemUseCase;
