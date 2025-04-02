const router = require('./project-members.router');

const { checkWorkspaceMembership } = require('../middlewares/authorization/workspace.authorization');
const { workspaceIdSchema } = require('../schemas/workspace.schema');

const { createTeamScheme, teamIdScheme, updateTeamScheme, asignProjectScheme, unasignProjectScheme } = require('../schemas/team.schema');
const { authorizationToCreateTeam, checkTeamMembership, checkAdminRoleToAssign, checkTeamOwnership } = require('../middlewares/authorization/team.authorization');
const { validateSession } = require('../middlewares/authentication.handler');
const { validatorHandler } = require('../middlewares/validator.handler');

const teamControllers = require('../controllers/team.controller');

router.get('/:workspaceId/teams',
  validateSession,
  validatorHandler(workspaceIdSchema, 'params'),
  checkWorkspaceMembership,
  teamControllers.getTeamsAndTheirMembersByWorkspace,
);

router.post('/:workspaceId/teams',
  validateSession,
  validatorHandler(workspaceIdSchema, 'params'),
  validatorHandler(createTeamScheme, 'body'),
  checkWorkspaceMembership,
  authorizationToCreateTeam,
  teamControllers.createTeam,
);

router.post('/:workspaceId/teams/:teamId/projects/:projectId',
  validateSession,
  validatorHandler(asignProjectScheme, 'params'),
  checkAdminRoleToAssign,
  teamControllers.assignTeamToProject,
);

router.patch('/:workspaceId/teams/:teamId',
  validateSession,
  validatorHandler(teamIdScheme, 'params'),
  validatorHandler(updateTeamScheme, 'body'),
  checkTeamMembership,
  teamControllers.updateProject,
);

router.delete('/:workspaceId/teams/:teamId/projects/:projectId',
  validateSession,
  validatorHandler(asignProjectScheme, 'params'),
  validatorHandler(unasignProjectScheme, 'body'),
  checkAdminRoleToAssign,
  teamControllers.unassignProject,
);

router.delete('/:workspaceId/teams/:teamId',
  validateSession,
  validatorHandler(teamIdScheme, 'params'),
  checkTeamOwnership,
  teamControllers.deleteProject,
);

module.exports = router;
