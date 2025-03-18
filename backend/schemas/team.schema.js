const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(50)
  .pattern(/^[a-zA-Z0-9-_ ]+$/)
  .messages({
    'string.pattern.base': 'The team name contains illegal characters'
  });

const teamIdScheme = Joi.object({
  workspaceId: id.required(),
  teamId: id.required()
});

const createTeamScheme = Joi.object({
  name: name.required(),
});

const updateTeamScheme = Joi.object({
  name: name.required(),
});

const deleteTeamScheme = Joi.object({
  workspaceMemberId: id.required(),
});

const asignProjectScheme = Joi.object({
  workspaceId: id.required(),
  teamId: id.required(),
  projectId: id.required(),
});


module.exports = {
  teamIdScheme,
  createTeamScheme,
  updateTeamScheme,
  deleteTeamScheme,
  asignProjectScheme
}
