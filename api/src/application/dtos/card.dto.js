class CardDto {
  constructor({ id, name, description, listId, createdAt }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.listId = listId;
    this.createdAt = createdAt;
  }
}

module.exports = CardDto;
