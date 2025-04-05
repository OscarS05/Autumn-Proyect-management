const { v4: uuidv4 } = require('uuid');

const ListName = require('../value-objects/listName');

class ListEntity {
  constructor({ name, projectId, createdAt }) {
    this.id = uuidv4();
    this.name = new ListName(name).value;
    this.projectId = projectId;
    this.createdAt = createdAt || new Date().toISOString();
  }
}

module.exports = ListEntity;
