const router = require('./team.router');

const boom = require('@hapi/boom');

const { workspaceIdSchema } = require('../schemas/workspace.schema');
const { createWorkspaceMember, updateWorkspaceMember, updateWorkspaceMemberIdParams, removeMember, transferOwnership } = require('../schemas/workspace-member.schema');

const { validatorHandler } = require('../middlewares/validator.handler');
const { validateSession } = require('../middlewares/authentication.handler');
const { checkAdminRole, checkOwnership, checkWorkspaceMembership } = require('../middlewares/authorization/workspace.authorization');

const { workspaceMemberService } = require('../../application/services/index');

router.get('/:workspaceId/members',
  validateSession,
  validatorHandler(workspaceIdSchema, 'params'),
  checkWorkspaceMembership,
  async (req, res, next) => {
    try {
      const { workspaceId } = req.params;

      const workspaceMembers = await workspaceMemberService.findAll(workspaceId);

      res.status(200).json({ workspaceMembers });
    } catch (error) {
      next(error);
    }
  }
);

router.post('/:workspaceId/members',
  validateSession,
  validatorHandler(workspaceIdSchema, 'params'),
  validatorHandler(createWorkspaceMember, 'body'),
  checkAdminRole,
  async (req, res, next) => {
    try {
      const { workspaceId } = req.params;
      const { userId } = req.body;

      const addedMember = await workspaceMemberService.create(workspaceId, userId);
      if(!addedMember) throw boom.badRequest('Failed to add member');

      res.status(201).json({ message: 'Member added successfully', workspaceMember: addedMember });
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:workspaceId/members/:workspaceMemberId',
  validateSession,
  validatorHandler(updateWorkspaceMemberIdParams, 'params'),
  validatorHandler(updateWorkspaceMember, 'body'),
  checkAdminRole,
  async (req, res, next) => {
    try {
      const { workspaceId, workspaceMemberId } = req.params;
      const { newRole } = req.body;

      const updatedMember = await workspaceMemberService.handleUpdateRole(workspaceId, workspaceMemberId, newRole);
      if(updatedMember === 0) throw boom.badRequest('Failed to update role');

      res.status(200).json({ message: 'Updated successfully', updatedMember });
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:workspaceId/ownership',
  validateSession,
  validatorHandler(workspaceIdSchema, 'params'),
  validatorHandler(transferOwnership, 'body'),
  checkOwnership,
  async (req, res, next) => {
    try {
      const { workspaceId } = req.params;
      const userId = req.user.sub;
      const { newOwnerId } = req.body;

      const updatedWorkspace = await workspaceMemberService.transferOwnership(workspaceId, userId, newOwnerId);
      if(!updatedWorkspace) throw boom.notFound('Workspace not found or transfer failed');

      res.status(200).json({ updatedWorkspace });
    } catch (error) {
      next(error);
    }
  }
)

router.delete('/:workspaceId/members/:workspaceMemberId',
  validateSession,
  validatorHandler(removeMember, 'params'),
  checkAdminRole,
  async (req, res, next) => {
    try {
      const { workspaceId, workspaceMemberId } = req.params;
      const requesterStatus = req.workspaceMemberStatus;

      const deletedMember = await workspaceMemberService.handleRemoveMember(workspaceId, workspaceMemberId, requesterStatus);
      if(deletedMember === 0) return next(boom.badRequest('Member not found or already removed'));

      res.status(200).json({ message: 'Member was removed successfully' });
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:workspaceId/members',
  validateSession,
  validatorHandler(workspaceIdSchema, 'params'),
  checkWorkspaceMembership,
  async (req, res, next) => {
    try {
      const { workspaceId } = req.params;
      const requesterStatus = req.workspaceMemberStatus;

      const deletedMember = await workspaceMemberService.leaveTheWorkspace(workspaceId, requesterStatus);
      if(deletedMember === 0) return next(boom.badRequest('Member not found or already removed'));

      res.status(200).json({ message: 'Owner was removed successfully' });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
