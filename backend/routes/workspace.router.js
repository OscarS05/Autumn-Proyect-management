const express = require('express');
const router = express.Router();
const { Boom } = require('@hapi/boom');

const { validatorHandler } = require('./../middlewares/validator.handler');
const { createWorkspace, updateWorkspace, deleteWorkspace } = require('./../schemas/workspace.schema');

const { validateSession } = require('./../middlewares/auth.handler');

const WorkspaceService = require('./../services/workspace.service');
const service = new WorkspaceService();
const Redis = require('../services/redis.service');
const redisService = new Redis();

router.get('/',
  validateSession,
  async (req, res, next) => {
    try {
      const userId = req.user.sub;

      const workspacesInRedis = await redisService.getAllWorkspaces(userId);
      if(workspacesInRedis && workspacesInRedis.length > 0){
        return res.status(200).json({ workspaces: workspacesInRedis});
      }
      const workspacesInDb = await service.findAll({ userId });
      if(workspacesInDb && workspacesInDb.length > 0){
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
      if(!workspaceUpdated) return next(Boom.badRequest('Failed to create workspace'));

      res.status(200).json({ message: 'Workspace updated successfully', workspace: workspaceUpdated });
    } catch (error) {
      next(error)
    }
  }
);

module.exports = router;
