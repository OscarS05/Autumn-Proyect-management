const express = require('express');
const router = express.Router();
const boom = require('@hapi/boom');

const { createTeamScheme, deleteTeamScheme, teamIdScheme, updateTeamScheme } = require('../schemas/team.schema');

const { authorizationToCreateTeam, checkTeamMembership } = require('../middlewares/authorization/team.authorization');
const { validateSession } = require('../middlewares/authentication.handler');
const { validatorHandler } = require('./../middlewares/validator.handler');

const { teamService } = require('../services/db/index');

// router.get('/:teamId',
//   validateSession,
//   validatorHandler(teamIdScheme, 'params'),
//   checkTeamMembership,
//   async (req, res, next) => {
//     try {
//       const { teamId } = req.params;

//       res.status(200).json({});
//     } catch (error) {
//       next(error);
//     }
//   }
// );



module.exports = router;
