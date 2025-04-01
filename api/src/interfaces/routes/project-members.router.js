const router = require('./project.router');

const { validatorHandler } = require('../middlewares/validator.handler');
const { validateSession } = require('../middlewares/authentication.handler');
const { checkProjectMembership, checkAdminRole, checkOwnership } = require('../middlewares/authorization/project.authorization');
const { projectIdSchema } = require('../schemas/project.schema');
const {addProjectMember, roleChangeSchema, projectMemberSchemas, transferOwnership } = require('../schemas/project-members.schema');

const projectMemberController = require('../controllers/project-member.controller');

router.get('/:workspaceId/projects/:projectId/members',
  validateSession,
  validatorHandler(projectIdSchema, 'params'),
  checkProjectMembership,
  projectMemberController.getProjectMembers,
);

router.post('/:workspaceId/projects/:projectId/members',
  validateSession,
  validatorHandler(projectIdSchema, 'params'),
  checkAdminRole,
  validatorHandler(addProjectMember, 'body'),
  projectMemberController.addMemberToProject,
);

router.patch('/:workspaceId/projects/:projectId/members/:projectMemberId',
  validateSession,
  validatorHandler(projectMemberSchemas, 'params'),
  validatorHandler(roleChangeSchema, 'body'),
  checkAdminRole,
  projectMemberController.changeRoleToMember,
);

router.patch('/:workspaceId/projects/:projectId/members/:projectMemberId/ownership',
  validateSession,
  validatorHandler(projectMemberSchemas, 'params'),
  checkOwnership,
  projectMemberController.transferOwnership
);

router.delete('/:workspaceId/projects/:projectId/members/:projectMemberId',
  validateSession,
  validatorHandler(projectMemberSchemas, 'params'),
  checkAdminRole,
  projectMemberController.removeMember,
);

module.exports = router;
