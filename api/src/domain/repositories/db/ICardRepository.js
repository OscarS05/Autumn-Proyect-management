const boom = require('@hapi/boom');

class ICardRepository {
  async create(cardEntity){
    throw boom.notImplemented('the create(cardEntity) method is not implemented');
  }

  async update(cardUpdateEntity){
    throw boom.notImplemented('the update(cardUpdateEntity) method is not implemented');
  }

  async delete(cardId){
    throw boom.notImplemented('the delete(cardId) method is not implemented');
  }

  async findOneById(cardId){
    throw boom.notImplemented('the findById(cardId) method is not implemented');
  }

  async findAll(listId){
    throw boom.notImplemented('the findAll(listId) method is not implemented');
  }
}

module.exports = ICardRepository;
