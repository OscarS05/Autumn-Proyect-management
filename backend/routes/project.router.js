const express = require('express');
const router = express.Router();
const { Boom } = require('@hapi/boom');

const { validatorHandler } = require('./../middlewares/validator.handler');
const { createProject, deleteProject, updateProject } = require('./../schemas/project.schema');

const { validateSession } = require('./../middlewares/auth.handler');

const ProjectService = require('./../services/project.service');
const service = new ProjectService();
const Redis = require('../services/redis.service');
const redisService = new Redis();

router.post('/create-project',
  validateSession,
  validatorHandler(createProject, 'body'),
  async (req, res, next) => {
    try {
      const { name, visibility, workspaceId } = req.body;
      console.log('req.body:', req.body)
      const userId = req.user.sub;

      const projectCreated = await service.create({ name, visibility, workspaceId });
      if(!projectCreated) return Boom.badRequest('Failed to create workspace');

      res.status(201).json({ message: 'Project created successfully', project: projectCreated });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
