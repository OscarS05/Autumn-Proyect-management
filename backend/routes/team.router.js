const router = require('../routes/workspace.router');
const boom = require('@hapi/boom');

const { checkWorkspaceMembership } = require('../middlewares/authorization/workspace.authorization');
const { workspaceIdSchema } = require('../schemas/workspace.schema');

const { createTeamScheme, deleteTeamScheme, teamIdScheme, updateTeamScheme, asignProjectScheme } = require('../schemas/team.schema');

const { authorizationToCreateTeam, checkTeamMembership, checkAdminRoleToAssign } = require('../middlewares/authorization/team.authorization');
const { validateSession } = require('../middlewares/authentication.handler');
const { validatorHandler } = require('./../middlewares/validator.handler');

const { teamService } = require('../services/db/index');

router.get('/:workspaceId/teams',
  validateSession,
  validatorHandler(workspaceIdSchema, 'params'),
  checkWorkspaceMembership,
  async (req, res, next) => {
    try {
      const { workspaceId } = req.params;
      const requesterUserId = req.user.sub;

      const teams = await teamService.getTeamsByWorkspaceController(workspaceId, requesterUserId);

      res.status(200).json({ teams });
    } catch (error) {
      next(error);
    }
  }
);

router.post('/:workspaceId/teams',
  validateSession,
  validatorHandler(workspaceIdSchema, 'params'),
  validatorHandler(createTeamScheme, 'body'),
  checkWorkspaceMembership,
  authorizationToCreateTeam,
  async (req, res, next) => {
    try {
      const { name } = req.body;
      const { workspaceId } = req.params;
      const workspaceMember = req.workspaceMemberStatus;

      const teamCreated = await teamService.createTeam(name, workspaceId, workspaceMember.id);
      if(!teamCreated) throw boom.badRequest('Something went wrong while creating team');

      res.status(200).json({ message: 'Team was successfully created', teamCreated });
    } catch (error) {
      next(error);
    }
  }
);

router.post('/:workspaceId/teams/:teamId/projects/:projectId',
  validateSession,
  validatorHandler(asignProjectScheme, 'params'),
  checkAdminRoleToAssign,
  async (req, res, next) => {
    try {
      const { workspaceId, teamId, projectId } = req.params;

      const result = await teamService.assignProjectController(workspaceId, teamId, projectId);

      res.status(200).json({
        message: 'The team was successfully assigned',
        result
      });
    } catch (error) {
      next(error);
    }
  }
);


router.patch('/:workspaceId/teams/:teamId',
  validateSession,
  validatorHandler(teamIdScheme, 'params'),
  validatorHandler(updateTeamScheme, 'body'),
  checkWorkspaceMembership,
  checkTeamMembership,
  async (req, res, next) => {
    try {
      const { name } = req.body;
      const teamMember = req.teamMember;

      const updatedTeam = await teamService.updateTeamController(name, teamMember.teamId);

      res.status(200).json({ message: 'Team was successfully updated', updatedTeam });
    } catch (error) {
      next(error);
    }
  }
);


module.exports = router;
