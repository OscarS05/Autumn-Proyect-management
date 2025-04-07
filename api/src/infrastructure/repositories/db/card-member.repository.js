const ICardMemberRepository = require('../../../domain/repositories/db/ICardMemberRepository');

class CardMemberRepository extends ICardMemberRepository {
  constructor(db) {
    super();
    this.db = db;
  }

  async create(cardEntity){
    return await this.db.models.CardMember.create(cardEntity);
  }

  async delete(cardId, projectMemberId){
    return await this.db.models.CardMember.destroy({ where: { cardId, projectMemberId } });
  }

  async findAll(cardId){
    return await this.db.models.CardMember.findAll({ where: { cardId } });
  }
}

module.exports = CardMemberRepository;
