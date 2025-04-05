const boom = require('@hapi/boom');
const CardName = require('../../../domain/value-objects/cardName');
const CardDescription = require('../../../domain/value-objects/cardDescription');
const CardDto = require('../../dtos/card.dto');

class UpdateCardUseCase {
  constructor({ cardRepository }) {
    this.cardRepository = cardRepository;
  }

  async execute(cardId, cardData) {
    const cardName = new CardName(cardData.newName).value;
    const cardDescription = new CardDescription(cardData.description).value;

    const [ updatedRows, [ updatedCard ] ] = await this.cardRepository.update(cardId, { name: cardName, description: cardDescription });
    if (updatedRows === 0) throw boom.badRequest('Zero rows updated');
    return new CardDto(updatedCard);
  }
}

module.exports = UpdateCardUseCase;
