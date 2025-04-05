const boom = require('@hapi/boom');
const CardDto = require('../../dtos/card.dto');

class CheckProjectMembershipByCardUseCase {
  constructor({ cardRepository }) {
    this.cardRepository = cardRepository;
  }

  async execute(userId, listId, cardId) {
    const card = await this.cardRepository.checkProjectMembershipByCard(userId, listId, cardId);
    return new CardDto(card);
  }
}

module.exports = CheckProjectMembershipByCardUseCase;
