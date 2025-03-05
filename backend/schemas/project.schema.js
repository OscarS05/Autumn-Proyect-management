const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(50)
  .pattern(/^[a-zA-Z0-9-_ ]+$/)
  .messages({
    'string.pattern.base': 'El nombre del proyecto contiene caracteres no permitidos'
  });
const visibility = Joi.string().valid('private', 'workspace');

const projectIdSchema = Joi.object({
  projectId: id.required()
});

const createProject = Joi.object({
  name: name.required(),
  visibility: visibility.required(),
  workspaceId: id.required(),
  workspaceMemberId: id.required()
});

const updateProject = Joi.object({
  name: name,
  visibility: visibility.allow(null, ''),
});

const deleteProject = Joi.object({
  workspaceId: id.required(),
  workspaceMemberId: id.required()
});


module.exports = { createProject, updateProject, deleteProject, projectIdSchema }
