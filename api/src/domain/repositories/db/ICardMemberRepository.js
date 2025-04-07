const boom = require('@hapi/boom');

class ICardMemberRepository {
  async create(cardEntity){
    throw boom.notImplemented('the create(cardMemberEntity) method is not implemented');
  }

  async delete(cardId){
    throw boom.notImplemented('the delete(cardId) method is not implemented');
  }

  async findAll(cardId){
    throw boom.notImplemented('the findAll(cardId) method is not implemented');
  }
}

module.exports = ICardMemberRepository;
