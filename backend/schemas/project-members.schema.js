const Joi = require('joi');

const id = Joi.number().integer();
const role = Joi.string().valid('member', 'admin');

const getProjectMembersSchema = Joi.object({
  projectId: id.required(),
});

const createWorkspaceMember = Joi.object({
  userId: id.required()
});

const updateWorkspaceMember = Joi.object({
  newRole: role.required(),
});

const updateWorkspaceMemberIdParams = Joi.object({
  workspaceId: id.required(),
  workspaceMemberId: id.required(),
});

const removeMember =  Joi.object({
  workspaceId: id.required(),
  workspaceMemberId: id.required()
});

const transferOwnership = Joi.object({
  newOwnerId: id.required()
});


module.exports = {
  getProjectMembersSchema
};
