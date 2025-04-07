class DeleteCardMemberUseCase {
  constructor({ cardMemberRepository }){
    this.cardMemberRepository = cardMemberRepository;
  }

  async execute(cardId, projectMemberId){
    return await this.cardMemberRepository.delete(cardId, projectMemberId);
  }
}

module.exports = DeleteCardMemberUseCase;
