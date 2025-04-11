const { v4: uuidv4 } = require('uuid');

const CardAttachmentFileName = require('../value-objects/cardAttachmentFileName');
const CardAttachmentUrl = require('../value-objects/cardAttachmentUrl');

class CardAttachmentEntity {
  constructor({ filename, url, cardId, type, publicId, createdAt }) {
    this.id = uuidv4();
    this.filename = new CardAttachmentFileName(filename).value;
    this.url = new CardAttachmentUrl(url).value;
    this.cardId = cardId;
    this.type = type;
    this.publicId = publicId;
    this.createdAt = createdAt || new Date().toISOString();
  }
}

module.exports = CardAttachmentEntity;
