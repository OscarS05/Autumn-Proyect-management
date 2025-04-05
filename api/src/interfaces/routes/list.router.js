const router = require('./team-member.router');

const { projectIdSchema } = require('../schemas/project.schema');
const { listNameSchema, updateListSchema, listSchema } = require('../schemas/list.schema');
const { checkProjectMembership } = require('../middlewares/authorization/project.authorization');
const { validatorHandler } = require('../middlewares/validator.handler');
const { validateSession } = require('../middlewares/authentication.handler');

const listControllers = require('../controllers/list.controller');

router.get('/:workspaceId/projects/:projectId/lists',
  validateSession,
  validatorHandler(projectIdSchema, 'params'),
  checkProjectMembership,
  listControllers.getLists
);

router.post('/:workspaceId/projects/:projectId/lists',
  validateSession,
  validatorHandler(projectIdSchema, 'params'),
  validatorHandler(listNameSchema, 'body'),
  checkProjectMembership,
  listControllers.createList
);

router.patch('/:workspaceId/projects/:projectId/lists/:listId',
  validateSession,
  validatorHandler(listSchema, 'params'),
  validatorHandler(updateListSchema, 'body'),
  checkProjectMembership,
  listControllers.updateList
);

router.delete('/:workspaceId/projects/:projectId/lists/:listId',
  validateSession,
  validatorHandler(listSchema, 'params'),
  checkProjectMembership,
  listControllers.deleteList
);

module.exports = router;
