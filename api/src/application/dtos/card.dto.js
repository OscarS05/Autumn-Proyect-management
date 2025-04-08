const ChecklistDto = require('./checklist.dto');

class CardDto {
  constructor({ id, name, description, listId, createdAt }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.listId = listId;
    this.createdAt = createdAt;
  }

  static withChecklists(card){
    return {
      cardId: card.id,
      name: card.name,
      checklists: card.checklists.map(checklist => new ChecklistDto(checklist))
    };
  }
}

module.exports = CardDto;
