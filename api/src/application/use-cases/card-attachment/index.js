const dbRepositories = require('../../../infrastructure/repositories/db/index');
const fileStorageRepositories = require('../../../infrastructure/repositories/storage/index');

const GetAllCardAttachmentsUseCase = require('./GetAllCardAttachmentsUseCase');
const GetCardAttachmentByIdUseCase = require('./GetCardAttachmentByIdUseCase');
const SaveCardAttachmentUseCase = require('./SaveCardAttachmentUseCase');
const UpdateCardAttachmentUseCase = require('./UpdateCardAttachmentUseCase');
const DeleteCardAttachmentUseCase = require('./DeleteCardAttachmentUseCase');

const getAllCardAttachmentsUseCase = new GetAllCardAttachmentsUseCase(dbRepositories);
const getCardAttachmentByIdUseCase = new GetCardAttachmentByIdUseCase(dbRepositories);
const saveCardAttachmentUseCase = new SaveCardAttachmentUseCase(dbRepositories);
const updateCardAttachmentUseCase = new UpdateCardAttachmentUseCase(dbRepositories);
const deleteCardAttachmentUseCase = new DeleteCardAttachmentUseCase(dbRepositories, fileStorageRepositories);

module.exports = {
  getAllCardAttachmentsUseCase,
  getCardAttachmentByIdUseCase,
  saveCardAttachmentUseCase,
  updateCardAttachmentUseCase,
  deleteCardAttachmentUseCase,
};
