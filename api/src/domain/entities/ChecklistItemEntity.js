const { v4: uuidv4 } = require('uuid');

const ChecklistName = require('../value-objects/checklistName');

class ChecklistItemEntity {
  constructor({ name, checklistId, dueDate }) {
    this.id = uuidv4();
    this.name = new ChecklistName(name).value;
    this.checklistId = checklistId;
    this.dueDate = dueDate || null;
    this.createdAt = new Date().toISOString();
  }
}

module.exports = ChecklistItemEntity;
