const { cardMemberRouter: cardRouter, router: labelRouter } = require('./label.router');

const { validateSession } = require('../middlewares/authentication.handler');
const { validatorHandler } = require('../middlewares/validator.handler');
const { checkProjectMembershipByUserId } = require('../middlewares/authorization/project.authorization');
const { checkProjectMembershipByCard } = require('../middlewares/authorization/card.authorization');
const { cardIdSchema, projectIdSchema } = require('../schemas/label.schema');
const { checklistSchema, createChecklistSchema, updateCardSchema } = require('../schemas/checklist.schema');

const checklistControllers = require('../controllers/checklist.controller');

labelRouter.get('/projects/:projectId/checklists',
  validateSession,
  validatorHandler(projectIdSchema, 'params'),
  checkProjectMembershipByUserId,
  checklistControllers.getAllChecklistsByProject
);

cardRouter.get('/:cardId/checklists',
  validateSession,
  validatorHandler(cardIdSchema, 'params'),
  checkProjectMembershipByCard,
  checklistControllers.getAllChecklistsByCard
);

cardRouter.post('/:cardId/checklists',
  validateSession,
  validatorHandler(cardIdSchema, 'params'),
  validatorHandler(createChecklistSchema, 'body'),
  checkProjectMembershipByCard,
  checklistControllers.createChecklist
);

cardRouter.patch('/:cardId/checklists/:checklistId',
  validateSession,
  validatorHandler(checklistSchema, 'params'),
  validatorHandler(updateCardSchema, 'body'),
  checkProjectMembershipByCard,
  checklistControllers.updateChecklist
);

cardRouter.delete('/:cardId/checklists/:checklistId',
  validateSession,
  validatorHandler(checklistSchema, 'params'),
  checkProjectMembershipByCard,
  checklistControllers.deleteChecklist
);

module.exports = { cardRouter, labelRouter };
