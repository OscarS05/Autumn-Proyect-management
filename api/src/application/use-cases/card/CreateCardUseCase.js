const CardEntity = require('../../../domain/entities/CardEntity');
const CardDto = require('../../dtos/card.dto');

class CreateCardUseCase {
  constructor({ cardRepository }) {
    this.cardRepository = cardRepository;
  }

  async execute(listId, cardData) {
    const cardEntity = new CardEntity(cardData);
    const card = await this.cardRepository.create(listId, cardEntity);
    return new CardDto(card);
  }
}

module.exports = CreateCardUseCase;
