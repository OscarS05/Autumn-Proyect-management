const express = require('express');
const router = express.Router();
const boom = require('@hapi/boom');

const { createWorkspace, updateWorkspace, workspaceIdSchema } = require('./../schemas/workspace.schema');

const { validatorHandler } = require('./../middlewares/validator.handler');
const { validateSession } = require('../middlewares/authentication.handler');
const { authorizationToCreateWorkspace, checkAdminRole, checkOwnership } = require('../middlewares/authorization/workspace.authorization');

const { WorkspaceRedis } = require('../services/redis/index');
const { workspaceService } = require('../services/db/index');

router.get('/:workspaceId/projects',
  validateSession,
  validatorHandler(workspaceIdSchema, 'params'),
  async (req, res, next) => {
    try {
      const userId = req.user.sub;
      const { workspaceId } = req.params;

      const workspaceAndItsProjects = await WorkspaceRedis.getWorkspaceAndItsProjects(workspaceId, userId);
      if(workspaceAndItsProjects){
        return res.status(200).json({ workspace: workspaceAndItsProjects});
      }
      const data = await workspaceService.findWorkspaceAndItsProjects(workspaceId, userId);
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
      const workspacesInDb = await workspaceService.findWorkspacesAndProjects(userId);
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

      const workspace = await workspaceService.create({ name, description, userId });
      if(workspace.isboom){
        return next(boom.badRequest('Failed to create workspace'));
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

      const workspaceUpdated = await workspaceService.update(workspaceId, data, userId);
      if(!workspaceUpdated) return next(boom.badRequest('Failed to update workspace'));

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
      const requesterStatus = req.ownerStatus;

      const isWorkspaceDeleted = await workspaceService.delete(userId, workspaceId, requesterStatus.id);
      if(!isWorkspaceDeleted) return next(boom.notFound('Workspace not found'));

      res.status(200).json({ message: 'Workspace deleted successfully' });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
