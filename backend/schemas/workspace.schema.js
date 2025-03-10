const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(50);
const description = Joi.string().max(255);

const createWorkspace = Joi.object({
  name: name.required(),
  description: description.allow(null, ''),
});

const updateWorkspace = Joi.object({
  name: name,
  description: description.allow(null, ''),
});

const workspaceIdSchema =  Joi.object({
  workspaceId: id.required()
});


module.exports = { createWorkspace, updateWorkspace, workspaceIdSchema }
