const express = require('express');
const router = express.Router();

const { validateSession } = require('../middlewares/authentication.handler');
const { validatorHandler } = require('../middlewares/validator.handler');
const { checkProjectMembershipByCard } = require('../middlewares/authorization/card.authorization');
const { cardIdSchema } = require('../schemas/card.schema');
const { attachLink, cardAttachmentSchema, updateCardAttachmentSchema } = require('../schemas/card-attachment.schema');
const { conditionalUploadFileMiddleware } = require('../middlewares/upload-files.handler');

const cardAttachmentControllers = require('../controllers/card-attachments.controller');

router.get('/:cardId/attachments',
  validateSession,
  validatorHandler(cardIdSchema, 'params'),
  checkProjectMembershipByCard,
  cardAttachmentControllers.getAllCardAttachments
);

router.post('/:cardId/attachments',
  validateSession,
  validatorHandler(cardIdSchema, 'params'),
  checkProjectMembershipByCard,
  conditionalUploadFileMiddleware,
  validatorHandler(attachLink, 'body'),
  cardAttachmentControllers.saveCardAttachment
);

router.patch('/:cardId/attachments/:attachmentId',
  validateSession,
  validatorHandler(cardAttachmentSchema, 'params'),
  validatorHandler(updateCardAttachmentSchema, 'body'),
  checkProjectMembershipByCard,
  cardAttachmentControllers.updateCardAttachment
);

router.delete('/:cardId/attachments/:attachmentId',
  validateSession,
  validatorHandler(cardAttachmentSchema, 'params'),
  checkProjectMembershipByCard,
  cardAttachmentControllers.deleteCardAttachent
);

router.get('/:cardId/attachments/:attachmentId/download',
  validateSession,
  validatorHandler(cardAttachmentSchema, 'params'),
  checkProjectMembershipByCard,
  cardAttachmentControllers.downloadCardAttachment
);

module.exports = router;
