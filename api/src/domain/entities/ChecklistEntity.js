const { v4: uuidv4 } = require('uuid');

const ChecklistName = require('../value-objects/checklistName');

class ChecklistEntity {
  constructor({ name, cardId }) {
    this.id = uuidv4();
    this.name = new ChecklistName(name).value;
    this.cardId = cardId;
    this.createdAt = new Date().toISOString();
  }
}

module.exports = ChecklistEntity;
