const Boom = require("@hapi/boom");
const EntityUpdateCardAttachment = require('../../../domain/entities/EntityUpdateCardAttachment');
const CardAttachmentDto = require('../../dtos/card-attachment.dto');

class UpdateCardAttachmentUseCase {
  constructor({ cardAttachmentRepository }){
    this.cardAttachmentRepository = cardAttachmentRepository;
  }

  async execute(cardAttachment, cardAttachmentData){
    if(cardAttachment.type !== 'external-link' && cardAttachmentData.url) throw Boom.badData('You can only modify the URL of external link attachments');

    const entityUpdateCardAttachment = new EntityUpdateCardAttachment(cardAttachmentData);

    const [ updatedRows, [ updatedAttachment ] ] = await this.cardAttachmentRepository.update(cardAttachment.id, entityUpdateCardAttachment);
    if(!updatedAttachment?.id) throw Boom.badRequest('Something went wrong updating the attachment');

    return new CardAttachmentDto(updatedAttachment);
  }
}

module.exports = UpdateCardAttachmentUseCase;
