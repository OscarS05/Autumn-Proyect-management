const { cardRouter } = require('./checklist.router');

const { validateSession } = require('../middlewares/authentication.handler');
const { validatorHandler } = require('../middlewares/validator.handler');
const { checkProjectMembershipByCard } = require('../middlewares/authorization/card.authorization');
const { checklistSchema } = require('../schemas/checklist.schema');
const { checklistItemSchema, createChecklistItemSchema, schemaUpdateCheck, updateChecklistItemSchema } = require('../schemas/checklist-item.schema');

const checklistItemControllers = require('../controllers/checklist-item.controller');

cardRouter.get('/:cardId/checklists/:checklistId/checklist-items',
  validateSession,
  validatorHandler(checklistSchema, 'params'),
  checkProjectMembershipByCard,
  checklistItemControllers.getAllChecklistItems
);

cardRouter.post('/:cardId/checklists/:checklistId/checklist-items',
  validateSession,
  validatorHandler(checklistSchema, 'params'),
  validatorHandler(createChecklistItemSchema, 'body'),
  checkProjectMembershipByCard,
  checklistItemControllers.createChecklistItem
);

cardRouter.patch('/:cardId/checklists/:checklistId/checklist-items/:checklistItemId',
  validateSession,
  validatorHandler(checklistItemSchema, 'params'),
  validatorHandler(updateChecklistItemSchema, 'body'),
  checkProjectMembershipByCard,
  checklistItemControllers.updateChecklistItem
);

cardRouter.patch('/:cardId/checklists/:checklistId/checklist-items/:checklistItemId/check',
  validateSession,
  validatorHandler(checklistItemSchema, 'params'),
  validatorHandler(schemaUpdateCheck, 'body'),
  checkProjectMembershipByCard,
  checklistItemControllers.updateTheCheckOfItem
);

cardRouter.delete('/:cardId/checklists/:checklistId/checklist-items/:checklistItemId',
  validateSession,
  validatorHandler(checklistItemSchema, 'params'),
  checkProjectMembershipByCard,
  checklistItemControllers.deleteChecklistItem
);

module.exports = cardRouter;
