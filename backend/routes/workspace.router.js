const express = require('express');
const router = express.Router();
const { Boom } = require('@hapi/boom');

const { validatorHandler } = require('./../middlewares/validator.handler');
const { createWorkspace, updateWorkspace, deleteWorkspace } = require('./../schemas/workspace.schema');

const { validateSession } = require('./../middlewares/auth.handler');

const WorkspaceService = require('./../services/workspace.service');
const service = new WorkspaceService();
const { WorkspaceRedis } = require('../services/redis/index');


router.get('/:workspaceId/projects',
  validateSession,
  async (req, res, next) => {
    try {
      const userId = req.user.sub;
      const { workspaceId } = req.params;

      const { workspace, projects } = await WorkspaceRedis.getWorkspaceAndItsProjects(workspaceId);
      if(workspace && projects.length > 0){
        return res.status(200).json({ workspace, projects});
      }
      const data = await service.findAll({ workspaceId });
      if(data && data.length > 0){
        return res.status(200).json({ workspace: data});
      }
      res.status(200).json({ workspaces: [] });
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

      res.status(200).json({ workspaces: [] });
    } catch (error) {
      next(error);
    }
  }
)

router.post('/create-workspace',
  validateSession,
  validatorHandler(createWorkspace, 'body'),
  async (req, res, next) => {
    try {
      const { name, description } = req.body;
      const userId = req.user.sub;

      const workspace = await service.create({ name, description, userId });
      if(!workspace){
        return next(Boom.badRequest('Failed to create workspace'));
      }
      res.status(201).json({ workspace: workspace });
    } catch (error) {
      next(error);
    }
  }
)

router.patch('/update-workspace',
  validateSession,
  validatorHandler(updateWorkspace, 'body'),
  async (req, res, next) => {
    try {
      const data = req.body;
      const userId = req.user.sub;

      const workspaceUpdated = await service.update(data.id, data);
      if(!workspaceUpdated) return next(Boom.badRequest('Failed to update workspace'));

      res.status(200).json({ message: 'Workspace updated successfully', workspace: workspaceUpdated });
    } catch (error) {
      next(error)
    }
  }
);

router.delete('/delete-workspace',
  validateSession,
  validatorHandler(deleteWorkspace, 'body'),
  async (req, res, next) => {
    try {
      const data = req.body;
      const userId = req.user.sub;

      const isWorkspaceDeleted = await service.delete(userId, data.id);
      if(!isWorkspaceDeleted) return next(Boom.notFound('Workspace not found'));

      res.status(200).json({ message: 'Workspace deleted successfully' });
    } catch (error) {
      next(error);
    }
  }
)

module.exports = router;
