class CardMemberEntity {
  constructor({ id, projectMemberId, cardId, createdAt }) {
    this.id = id;
    this.projectMemberId = projectMemberId;
    this.cardId = cardId;
    this.createdAt = createdAt || new Date().toISOString();
  }
}

module.exports = CardMemberEntity;
