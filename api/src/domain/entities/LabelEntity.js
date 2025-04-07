const { v4: uuidv4 } = require('uuid');

const LabelName = require('../value-objects/labelName');
const LabelColor = require('../value-objects/labelColor');

class LabelEntity {
  constructor({ name, color, projectId }) {
    this.id = uuidv4();
    this.name = new LabelName(name).value;
    this.color = new LabelColor(color).value;
    this.projectId = projectId;
  }
}

module.exports = LabelEntity;
