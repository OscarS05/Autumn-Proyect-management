const Joi = require('joi');

const id = Joi.number().integer();
const role = Joi.string().valid('member', 'admin');

const projectIdSchema = Joi.object({
  projectId: id.required(),
});

const addProjectMember = Joi.object({
  workspaceMemberId: id.required()
});

const roleChangeSchema = Joi.object({
  newRole: role.required(),
});

const projectParamsSchemas = Joi.object({
  projectId: id.required(),
  projectMemberId: id.required(),
});

const removeMember =  Joi.object({
  workspaceId: id.required(),
  workspaceMemberId: id.required()
});

const transferOwnership = Joi.object({
  newOwnerId: id.required()
});


module.exports = {
  addProjectMember,
  projectIdSchema,
  projectParamsSchemas,
  roleChangeSchema
};
