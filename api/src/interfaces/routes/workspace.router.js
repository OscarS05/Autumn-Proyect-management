const express = require('express');
const router = express.Router();

const { createWorkspace, updateWorkspace, workspaceIdSchema } = require('../schemas/workspace.schema');
const { validatorHandler } = require('../middlewares/validator.handler');
const { validateSession } = require('../middlewares/authentication.handler');
const { authorizationToCreateWorkspace, checkAdminRole, checkOwnership, checkWorkspaceMembership } = require('../middlewares/authorization/workspace.authorization');

const workspaceControllers = require('../controllers/workspace.controller');

router.get('/:workspaceId',
  validateSession,
  validatorHandler(workspaceIdSchema, 'params'),
  checkWorkspaceMembership,
  workspaceControllers.getWorkspaceAndItsProjects,
)

router.get('/',
  validateSession,
  workspaceControllers.getWorkspacesAndProjects,
)

router.post('/',
  validateSession,
  authorizationToCreateWorkspace,
  validatorHandler(createWorkspace, 'body'),
  workspaceControllers.createWorkspace,
)

router.patch('/:workspaceId',
  validateSession,
  validatorHandler(workspaceIdSchema, 'params'),
  validatorHandler(updateWorkspace, 'body'),
  checkAdminRole,
  workspaceControllers.updateWorkspace,
);

router.delete('/:workspaceId',
  validateSession,
  validatorHandler(workspaceIdSchema, 'params'),
  checkOwnership,
  workspaceControllers.deleteWorkspace,
);

module.exports = router;
