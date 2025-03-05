const express = require('express');
const router = express.Router();
const { Boom } = require('@hapi/boom');

// const { validatorHandler } = require('./../middlewares/validator.handler');
// const { createWorkspace, updateWorkspace, deleteWorkspace } = require('./../schemas/workspace.schema');

const { validateSession } = require('../middlewares/authentication.handler');

const WorkspaceMemberService = require('./../services/workspace-member.service');
const service = new WorkspaceMemberService();
// const { WorkspaceMemberRedis } = require('../services/redis/index');

router.get('/:workspaceId/members',
  validateSession,
  async (req, res, next) => {
    try {
      const { workspaceId } = req.params;

      const workspaceMembers = await service.findAll(workspaceId);

      res.status(200).json({ workspaceMembers });
    } catch (error) {
      next(error);
    }
  }
)

module.exports = router;
