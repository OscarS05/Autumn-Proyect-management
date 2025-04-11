const boom = require('@hapi/boom');

class ICardAttachmentRepository {
  async create(cardAttachmentEntity){
    throw boom.notImplemented('the create(cardAttachmentEntity) method is not implemented');
  }

  async update(entityUpdateCardAttachment){
    throw boom.notImplemented('the update(entityUpdateCardAttachment) method is not implemented');
  }

  async delete(cardAttachmentId){
    throw boom.notImplemented('the delete(cardAttachmentId) method is not implemented');
  }

  async findOne(cardId, cardAttachmentId){
    throw boom.notImplemented('the findOne(cardId, cardAttachmentId) method is not implemented');
  }

  async findAll(cardId){
    throw boom.notImplemented('the findAll(cardId) method is not implemented');
  }
}

module.exports = ICardAttachmentRepository;
