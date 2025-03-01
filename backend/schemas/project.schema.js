const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(50)
  .pattern(/^[a-zA-Z0-9-_ ]+$/)
  .messages({
    'string.pattern.base': 'El nombre del proyecto contiene caracteres no permitidos'
  });
const visibility = Joi.string().valid('private', 'workspace');

const createProject = Joi.object({
  name: name.required(),
  visibility: visibility.required(),
  workspaceId: id.required(),
});

const updateProject = Joi.object({
  id: id.required(),
  name: name,
  visibility: visibility.allow(null, ''),
});

const deleteProject = Joi.object({
  id: id.required(),
  workspaceId: id.required(),
});


module.exports = { createProject, updateProject, deleteProject }
