const boom = require('@hapi/boom');

class CardAttachmentService {
  constructor({ getAllCardAttachmentsUseCase, getCardAttachmentByIdUseCase, saveCardAttachmentUseCase, updateCardAttachmentUseCase, deleteCardAttachmentUseCase }){
    this.getAllCardAttachmentsUseCase = getAllCardAttachmentsUseCase;
    this.getCardAttachmentByIdUseCase = getCardAttachmentByIdUseCase;
    this.saveCardAttachmentUseCase = saveCardAttachmentUseCase;
    this.updateCardAttachmentUseCase = updateCardAttachmentUseCase;
    this.deleteCardAttachmentUseCase = deleteCardAttachmentUseCase;
  }

  async getAllCardAttachments(cardId){
    return await this.getAllCardAttachmentsUseCase.execute(cardId);
  }

  async saveCardAttachment(cardAttachmentData){
    return await this.saveCardAttachmentUseCase.execute(cardAttachmentData);
  }

  async updateCardAttachment(cardId, attachmentId, cardAttachmentData){
    const cardAttachment = await this.getCardAttachmentById(cardId, attachmentId);
    if(!cardAttachment?.id) throw boom.notFound('The card attachment does not exist or does not belong to the card');
    return await this.updateCardAttachmentUseCase.execute(cardAttachment, cardAttachmentData);
  }

  async deleteCardAttachment(cardId, attachmentId){
    const cardAttachment = await this.getCardAttachmentById(cardId, attachmentId);
    if(!cardAttachment?.id) throw boom.notFound('The card attachment does not exist or does not belong to the card');
    return await this.deleteCardAttachmentUseCase.execute(cardAttachment);
  }

  async getCardAttachmentById(cardId, attachmentId){
    return await this.getCardAttachmentByIdUseCase.execute(cardId, attachmentId);
  }
}

module.exports = CardAttachmentService;
