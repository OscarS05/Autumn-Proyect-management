const ChecklistName = require('../value-objects/checklistName');

class UpdateChecklistItemEntity {
  constructor({ name, dueDate }) {
    this.name = new ChecklistName(name).value;
    if (dueDate !== undefined) this.dueDate = dueDate;
  }
}

module.exports = UpdateChecklistItemEntity;
