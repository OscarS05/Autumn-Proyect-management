const express = require('express');
const router = express.Router();
const { Boom, boomify } = require('@hapi/boom');

const { validatorHandler } = require('./../middlewares/validator.handler');
const { createWorkspace, updateWorkspace, transferOwnership, workspaceIdSchema } = require('./../schemas/workspace.schema');
const { createWorkspaceMember, updateWorkspaceMember, updateWorkspaceMemberIdParams, removeMember } = require('./../schemas/workspace-member.schema');

const { validateSession } = require('../middlewares/authentication.handler');
const { authorizationToCreateWorkspace, checkAdminRole, checkOwnership, checkWorkspaceMembership } = require('../middlewares/authorization.handler');

const WorkspaceService = require('./../services/workspace.service');
const service = new WorkspaceService();

const WorkspaceMemberService = require('./../services/workspace-member.service');
const workspaceMemberService = new WorkspaceMemberService();

const { WorkspaceRedis } = require('../services/redis/index');

// Workspaces
router.get('/:workspaceId/projects',
  validateSession,
  validatorHandler(workspaceIdSchema, 'params'),
  async (req, res, next) => {
    try {
      const userId = req.user.sub;
      const { workspaceId } = req.params;

      const workspaceAndItsProjects = await WorkspaceRedis.getWorkspaceAndItsProjects(workspaceId);
      if(workspaceAndItsProjects){
        return res.status(200).json({ workspace: workspaceAndItsProjects});
      }
      const data = await service.findWorkspaceAndItsProjects(workspaceId, userId);
      if(data && data.length > 0){
        return res.status(200).json({ workspace: data});
      }

      res.status(200).json({ message: 'Workspace not found', workspace: data });
    } catch (error) {
      next(error);
    }
  }
)

router.get('/',
  validateSession,
  async (req, res, next) => {
    try {
      const userId = req.user.sub;

      const listOfWorkspaces = await WorkspaceRedis.getWorkspacesAndProjects(userId);
      if(listOfWorkspaces.owner && listOfWorkspaces.guest){
        return res.status(200).json({ workspaces: listOfWorkspaces});
      }
      const workspacesInDb = await service.findWorkspacesAndProjects(userId);
      if(workspacesInDb.owner && workspacesInDb.guest){
        return res.status(200).json({ workspaces: workspacesInDb});
      }

      res.status(200).json({ workspaces: [], projects: []});
    } catch (error) {
      next(error);
    }
  }
)

router.post('/',
  validateSession,
  authorizationToCreateWorkspace,
  validatorHandler(createWorkspace, 'body'),
  async (req, res, next) => {
    try {
      const { name, description } = req.body;
      const userId = req.user.sub;

      const workspace = await service.create({ name, description, userId });
      if(workspace.isBoom){
        return next(Boom.badRequest('Failed to create workspace'));
      }
      res.status(201).json({ workspace: workspace });
    } catch (error) {
      next(error);
    }
  }
)

router.patch('/:workspaceId',
  validateSession,
  validatorHandler(workspaceIdSchema, 'params'),
  validatorHandler(updateWorkspace, 'body'),
  checkAdminRole,
  async (req, res, next) => {
    try {
      const data = req.body;
      const { workspaceId } = req.params;
      const userId = req.user.sub;

      const workspaceUpdated = await service.update(workspaceId, data, userId);
      if(!workspaceUpdated) return next(Boom.badRequest('Failed to update workspace'));

      res.status(200).json({ message: 'Workspace updated successfully', workspace: workspaceUpdated });
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:workspaceId',
  validateSession,
  validatorHandler(workspaceIdSchema, 'params'),
  checkOwnership,
  async (req, res, next) => {
    try {
      const { workspaceId } = req.params;
      const userId = req.user.sub;

      const isWorkspaceDeleted = await service.delete(userId, workspaceId);
      if(!isWorkspaceDeleted) return next(Boom.notFound('Workspace not found'));

      res.status(200).json({ message: 'Workspace deleted successfully' });
    } catch (error) {
      next(error);
    }
  }
)

// Workspace members
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
      if(!addedMember) throw Boom.badRequest('Failed to add member');

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

      const updatedMember = await workspaceMemberService.updateRole(workspaceId, workspaceMemberId, newRole);
      if(updatedMember === 0) throw Boom.badRequest('Failed to update role');

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
      if(!updatedWorkspace) throw Boom.notFound('Workspace not found or transfer failed');

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

      const deletedMember = await workspaceMemberService.removeMember(workspaceId, workspaceMemberId, requesterStatus);
      if(deletedMember === 0) return next(Boom.badRequest('Member not found or already removed'));

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
      if(deletedMember === 0) return next(Boom.badRequest('Member not found or already removed'));

      res.status(200).json({ message: 'Owner was removed successfully' });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
