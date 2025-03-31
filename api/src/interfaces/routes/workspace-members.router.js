const router = require('./workspace.router');

const { workspaceIdSchema } = require('../schemas/workspace.schema');
const { createWorkspaceMember, updateWorkspaceMember, updateWorkspaceMemberIdParams, removeMember, transferOwnership } = require('../schemas/workspace-member.schema');

const { validatorHandler } = require('../middlewares/validator.handler');
const { validateSession } = require('../middlewares/authentication.handler');
const { checkAdminRole, checkOwnership, checkWorkspaceMembership } = require('../middlewares/authorization/workspace.authorization');

const workspaceMemberController = require('../controllers/workspace-member.controller');

router.get('/:workspaceId/members',
  validateSession,
  validatorHandler(workspaceIdSchema, 'params'),
  checkWorkspaceMembership,
  workspaceMemberController.getworkspaceMembers
);

router.post('/:workspaceId/members',
  validateSession,
  validatorHandler(workspaceIdSchema, 'params'),
  validatorHandler(createWorkspaceMember, 'body'),
  checkAdminRole,
  workspaceMemberController.addMemberToWorkspace
);

router.patch('/:workspaceId/members/:workspaceMemberId',
  validateSession,
  validatorHandler(updateWorkspaceMemberIdParams, 'params'),
  validatorHandler(updateWorkspaceMember, 'body'),
  checkAdminRole,
  workspaceMemberController.changeRoleToMember
);

router.patch('/:workspaceId/ownership',
  validateSession,
  validatorHandler(workspaceIdSchema, 'params'),
  validatorHandler(transferOwnership, 'body'),
  checkOwnership,
  workspaceMemberController.transferOwnership
)

router.delete('/:workspaceId/members/:workspaceMemberId',
  validateSession,
  validatorHandler(removeMember, 'params'),
  checkWorkspaceMembership,
  workspaceMemberController.removeMember
);

module.exports = router;
