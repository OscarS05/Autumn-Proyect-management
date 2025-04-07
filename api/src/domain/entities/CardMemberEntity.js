const { v4: uuidv4 } = require('uuid');

class CardMemberEntity {
  constructor({ projectMemberId, cardId, createdAt }) {
    this.id = uuidv4();
    this.projectMemberId = projectMemberId;
    this.cardId = cardId;
    this.createdAt = createdAt || new Date().toISOString();
  }
}

module.exports = CardMemberEntity;
