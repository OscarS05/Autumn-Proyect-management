const router = require('./team.router');

const { validatorHandler } = require('../middlewares/validator.handler');
const { validateSession } = require('../middlewares/authentication.handler');
const { teamIdScheme } = require('../schemas/team.schema');
const { roleChangeSchema, teamMemberSchemas, memberToBeAdded } = require('../schemas/team-member.schema');
const { checkTeamMembership, checkTeamOwnership, checkAdminRole } = require('../middlewares/authorization/team.authorization');
const { checkWorkspaceMembership } = require('../middlewares/authorization/workspace.authorization');

const teamMemberControllers = require('../controllers/team-member.controller');

router.get('/:workspaceId/teams/:teamId/members/:teamMemberId/projects',
  validateSession,
  validatorHandler(teamMemberSchemas, 'params'),
  checkTeamMembership,
  teamMemberControllers.getTeamProjectsByTeamMember
);

router.get('/:workspaceId/teams/:teamId/members',
  validateSession,
  validatorHandler(teamIdScheme, 'params'),
  checkWorkspaceMembership,
  teamMemberControllers.getTeamMembers
);

router.post('/:workspaceId/teams/:teamId/members',
  validateSession,
  validatorHandler(teamIdScheme, 'params'),
  validatorHandler(memberToBeAdded, 'body'),
  checkAdminRole,
  teamMemberControllers.addMemberToTeam,
);

router.patch('/:workspaceId/teams/:teamId/members/:teamMemberId',
  validateSession,
  validatorHandler(teamMemberSchemas, 'params'),
  validatorHandler(roleChangeSchema, 'body'),
  checkAdminRole,
  teamMemberControllers.updateRole,
);

router.patch('/:workspaceId/teams/:teamId/members/:teamMemberId/ownership',
  validateSession,
  validatorHandler(teamMemberSchemas, 'params'),
  checkTeamOwnership,
  teamMemberControllers.transferOwnership,
);

router.delete('/:workspaceId/teams/:teamId/members/:teamMemberId',
  validateSession,
  validatorHandler(teamMemberSchemas, 'params'),
  checkTeamMembership,
  teamMemberControllers.deleteTeamMember,
);

module.exports = router;
