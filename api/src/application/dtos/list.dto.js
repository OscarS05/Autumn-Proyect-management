const CardDto = require('./card.dto');

class ListDto {
  constructor({ id, name, projectId, cards, createdAt }) {
    this.id = id;
    this.name = name;
    this.projectId = projectId;
    this.createdAt = createdAt;
    this.cards = cards?.map(card => new CardDto(card));
  }
}

module.exports = ListDto;
