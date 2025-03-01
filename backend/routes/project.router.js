const express = require('express');
const router = express.Router();
const { Boom } = require('@hapi/boom');

const { validatorHandler } = require('./../middlewares/validator.handler');
const { createProject, deleteProject, updateProject } = require('./../schemas/project.schema');

const { validateSession } = require('./../middlewares/auth.handler');

const ProjectService = require('./../services/project.service');
const service = new ProjectService();
const { ProjectRedis } = require('../services/redis/index');


router.post('/create-project',
  validateSession,
  validatorHandler(createProject, 'body'),
  async (req, res, next) => {
    try {
      const { name, visibility, workspaceId } = req.body;
      const userId = req.user.sub;

      const projectCreated = await service.create({ name, visibility, workspaceId });
      if(!projectCreated) return Boom.badRequest('Failed to create workspace');

      res.status(201).json({ message: 'Project created successfully', project: projectCreated });
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/update-project',
  validateSession,
  validatorHandler(updateProject, 'body'),
  async (req, res, next) => {
    try {
      const data = req.body;

      const updatedProject = await service.update(data.id, data);
      if(!updatedProject) return Boom.badRequest('Failed to create workspace');

      res.status(200).json({ message: 'Project updated successfully', project: updatedProject });
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/delete-project',
  validateSession,
  validatorHandler(deleteProject, 'body'),
  async (req, res, next) => {
    try {
      const { id, workspaceId } = req.body;

      const response = await service.delete(id, workspaceId);
      if(!response) return Boom.badRequest('Failed to create workspace');

      res.status(200).json({ message: 'Project deleted successfully' });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
