const boom = require('@hapi/boom');
const ICardAttachmentRepository = require('../../../domain/repositories/db/ICardAttachmentRepository');

class CardAttachmentRepository extends ICardAttachmentRepository{
  constructor(db){
    super();
    this.db = db;
  }

  async create(cardAttachmentEntity){
    return await this.db.models.CardAttachment.create(cardAttachmentEntity);
  }

  async update(cardAttachmentId, entityUploadCardAttachment){
    return await this.db.models.CardAttachment.update(entityUploadCardAttachment, { where: { id: cardAttachmentId }, returning: true });
  }

  async delete(cardAttachmentId){
    return await this.db.models.CardAttachment.destroy({ where: { id: cardAttachmentId } });
  }

  async findOne(cardId, cardAttachmentId){
    return await this.db.models.CardAttachment.findOne({ where: { cardId, id: cardAttachmentId } });
  }

  async findAll(cardId){
    return await this.db.models.CardAttachment.findAll({ where: { cardId } });
  }
}

module.exports = CardAttachmentRepository;
