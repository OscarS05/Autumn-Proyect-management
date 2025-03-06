const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(50);
const description = Joi.string().max(255);

const createWorkspaceMember = Joi.object({
  userId: id.required()
});

const updateWorkspace = Joi.object({
  name: name,
  description: description.allow(null, ''),
});

const workspaceIdSchema =  Joi.object({
  workspaceId: id.required()
});

const transferOwnership = Joi.object({
  newOwnerId: id.required()
});


module.exports = { createWorkspaceMember, updateWorkspace, transferOwnership, workspaceIdSchema }
