const express = require('express');
const router = express.Router();
const { Boom } = require('@hapi/boom');

const { validatorHandler } = require('./../middlewares/validator.handler');
const { createWorkspace, updateWorkspace, transferOwnership, workspaceIdSchema } = require('./../schemas/workspace.schema');

const { validateSession } = require('../middlewares/authentication.handler');
const { authorizationToCreateWorkspace } = require('../middlewares/authorization.handler');

const WorkspaceService = require('./../services/workspace.service');
const service = new WorkspaceService();
const { WorkspaceRedis } = require('../services/redis/index');


router.get('/:workspaceId/projects',
  validateSession,
  validatorHandler(workspaceIdSchema, 'params'),
  async (req, res, next) => {
    try {
      const userId = req.user.sub;
      const { workspaceId } = req.params;

      const { workspace, projects } = await WorkspaceRedis.getWorkspaceAndItsProjects(workspaceId);
      if(workspace.type === 'workspace' && projects){
        return res.status(200).json({ workspace, projects});
      }
      const data = await service.findWorkspaceAndItsProjects(workspaceId, userId);
      if(data && data.length > 0){
        return res.status(200).json({ workspace: data});
      }

      res.status(400).json({ message: 'Workspace not found' });
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

      const { workspaces, projects } = await WorkspaceRedis.getWorkspacesAndProjects(userId);
      if(projects && workspaces.length > 0){
        return res.status(200).json({ workspaces: workspaces, projects: projects});
      }
      const workspacesInDb = await service.findWorkspacesAndProjects(userId);
      if(workspacesInDb.length > 0){
        return res.status(200).json({ workspaces: workspacesInDb});
      }

      res.status(400).json({ workspaces: [], projects: []});
    } catch (error) {
      next(error);
    }
  }
)

router.post('/create-workspace',
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

router.patch('/update-workspace/:workspaceId',
  validateSession,
  validatorHandler(workspaceIdSchema, 'params'),
  validatorHandler(updateWorkspace, 'body'),
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

router.patch('/:workspaceId/transfer-ownership',
  validateSession,
  validatorHandler(workspaceIdSchema, 'params'),
  validatorHandler(transferOwnership, 'body'),
  async (req, res, next) => {
    try {
      const { workspaceId } = req.params;
      const userId = req.user.sub;
      const { newOwnerId } = req.body;

      const updatedWorkspace = await service.transferOwnership(workspaceId, userId, newOwnerId);
      if(!updatedWorkspace) throw Boom.notFound('Workspace not found or transfer failed');

      res.status(200).json({ updatedWorkspace });
    } catch (error) {
      next(error);
    }
  }
)

router.delete('/delete-workspace/:workspaceId',
  validateSession,
  validatorHandler(workspaceIdSchema, 'params'),
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

module.exports = router;
