const express = require('express');
const router = express.Router();
const boom = require('@hapi/boom');

const { checkWorkspaceMembershipById } = require('../middlewares/authorization/workspace.authorization');

const { createTeamScheme, deleteTeamScheme, teamIdScheme, updateTeamScheme } = require('../schemas/team.schema');

const {  } = require('../middlewares/authorization/team.authorization');
const { validateSession } = require('../middlewares/authentication.handler');
const { validatorHandler } = require('./../middlewares/validator.handler');

const { teamService } = require('../services/db/index');

router.post('/',
  validateSession,
  validatorHandler(createTeamScheme, 'body'),
  checkWorkspaceMembershipById,
  async (req, res, next) => {
    try {
      const { name, workspaceId, workspaceMemberId } = req.body;

      const teamCreated = await teamService.createTeam(name, workspaceId, workspaceMemberId);

      res.status(200).json({ message: 'Team was successfully created', teamCreated });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
