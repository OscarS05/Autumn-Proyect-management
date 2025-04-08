class ChecklistDto {
  constructor({ id, name, cardId, items, createdAt }) {
    this.id = id;
    this.name = name;
    this.cardId = cardId;
    this.createdAt = createdAt;
    this.items = items;
  }
}

module.exports = ChecklistDto;
