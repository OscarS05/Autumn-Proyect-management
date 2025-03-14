const express = require('express');
const router = express.Router();
const boom = require('@hapi/boom');

const { workspaceIdSchema } = require('./../schemas/workspace.schema');
const { createProject, deleteProject, updateProject, projectIdSchema } = require('./../schemas/project.schema');

const { validatorHandler } = require('./../middlewares/validator.handler');
const { validateSession } = require('../middlewares/authentication.handler');
const { authorizationToCreateProject } = require('../middlewares/authorization/project.authorization');

const { projectService } = require('../services/db/index');
const { ProjectRedis } = require('../services/redis/index');


router.get('/:workspaceId',
  validateSession,
  validatorHandler(workspaceIdSchema, 'params'),
  async (req, res, next) => {
    try {
      const { workspaceId } = req.params;

      const projectsInRedis = await ProjectRedis.findAllProjects(workspaceId);
      if(projectsInRedis && projectsInRedis.length > 0){
        return res.status(200).json({ projects: projectsInRedis });
      }
      const projectsInDb = await projectService.findAll(workspaceId);
      if(projectsInDb && projectsInDb.length > 0){
        return res.status(200).json({ projects: projectsInDb });
      }

      res.status(200).json({ message: 'Workspace not found', workspace: projectsInDb });
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  validateSession,
  validatorHandler(createProject, 'body'),
  authorizationToCreateProject,
  async (req, res, next) => {
    try {
      const { name, visibility, workspaceId, workspaceMemberId } = req.body;
      const userId = req.user.sub;

      const projectCreated = await projectService.create({ name, visibility, workspaceId, workspaceMemberId });
      if(!projectCreated) throw boom.badRequest('Failed to create workspace');

      res.status(201).json({ message: 'Project created successfully', project: projectCreated });
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:projectId',
  validateSession,
  validatorHandler(projectIdSchema, 'params'),
  validatorHandler(updateProject, 'body'),
  async (req, res, next) => {
    try {
      const { projectId } = req.params;
      const data = req.body;

      const updatedProject = await projectService.update(projectId, data);
      if(!updatedProject) return boom.badRequest('Failed to create workspace');

      res.status(200).json({ message: 'Project updated successfully', project: updatedProject });
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:projectId',
  validateSession,
  validatorHandler(projectIdSchema, 'params'),
  validatorHandler(deleteProject, 'body'),
  async (req, res, next) => {
    try {
      const { projectId } = req.params;
      const { workspaceId, workspaceMemberId, projectMemberId } = req.body;

      const response = await projectService.delete(projectId, workspaceId, workspaceMemberId, projectMemberId);
      if(response === 0) return boom.badRequest('Failed to delete project');

      res.status(200).json({ message: 'Project deleted successfully' });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
