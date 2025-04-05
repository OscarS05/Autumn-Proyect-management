const boom = require('@hapi/boom');

class CardService {
  constructor({ getAllUseCase, getCardUseCase, createCardUseCase, checkProjectMembershipByCardUseCase, updateCardUseCase, deleteCardUseCase }) {
    this.getAllUseCase = getAllUseCase;
    this.getCardUseCase = getCardUseCase;
    this.checkProjectMembershipByCardUseCase = checkProjectMembershipByCardUseCase;
    this.createCardUseCase = createCardUseCase;
    this.updateCardUseCase = updateCardUseCase;
    this.deleteCardUseCase = deleteCardUseCase;
  }

  async create(cardData) {
    return await this.createCardUseCase.execute(cardData.listId, cardData);
  }

  async update(cardId, cardData) {
    return await this.updateCardUseCase.execute(cardId, cardData);
  }

  async delete(cardId){
    return await this.deleteCardUseCase.execute(cardId);
  }

  async findById(cardId){
    return await this.getCardUseCase.execute(cardId)
  }

  async findAll(listId){
    return await this.getAllUseCase.execute(listId);
  }

  async projectMembershipByCard(userId, listId, cardId){
    return await this.checkProjectMembershipByCardUseCase.execute(userId, listId, cardId);
  }
}

module.exports = CardService;
