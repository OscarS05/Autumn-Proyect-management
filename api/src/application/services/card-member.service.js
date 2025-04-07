const boom = require('@hapi/boom');

class CardMemberService {
  constructor({ getAllCardMembersUseCase, addMemberToCardUseCase, deleteCardMemberUseCase }, { getMemberByIdUseCase }) {
    this.getAllCardMembersUseCase = getAllCardMembersUseCase;
    this.addMemberToCardUseCase = addMemberToCardUseCase;
    this.deleteCardMemberUseCase = deleteCardMemberUseCase;

    // Project member use cases
    this.getMemberByIdUseCase = getMemberByIdUseCase;
  }

  async getCardMembers(cardId) {
    return await this.getAllCardMembersUseCase.execute(cardId);
  }

  async addCardMember(cardId, projectMemberId, requesterAsProjectMember) {
    const projectMember = await this.getProjectMemberById(projectMemberId);
    if (!projectMember?.id) throw boom.notFound('The project member to be added does not found');
    if(projectMember.projectId !== requesterAsProjectMember.projectId) {
      throw boom.conflict('The project member to be added does not belong to the project');
    }
    return await this.addMemberToCardUseCase.execute(cardId, projectMemberId);
  }

  async delete(cardId, projectMemberId, requesterAsProjectMember) {
    const memberToBeRemoved = await this.getProjectMemberById(projectMemberId);
    if(!memberToBeRemoved?.id) throw boom.notFound('The member to be removed to the card was not found');
    if(memberToBeRemoved.projectId !== requesterAsProjectMember.projectId) {
      throw boom.notFound('The member to be removed to the card does not belong to the project');
    }
    return await this.deleteCardMemberUseCase.execute(cardId, projectMemberId);
  }

  async getProjectMemberById(projectMemberId){
    return await this.getMemberByIdUseCase.execute(projectMemberId);
  }
}

module.exports = CardMemberService;
