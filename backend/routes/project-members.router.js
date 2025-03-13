const router = require('./project.router');

const boom = require('@hapi/boom');

const { validatorHandler } = require('../middlewares/validator.handler');
const { validateSession } = require('../middlewares/authentication.handler');
const { checkProjectMembership, checkAdminRole } = require('../middlewares/authorization/project.authorization');

const { projectIdSchema, addProjectMember, roleChangeSchema, projectParamsSchemas } = require('../schemas/project-members.schema');

const { projectMemberService } = require('../services/db/index');

router.get('/:projectId/members',
  validateSession,
  validatorHandler(projectIdSchema, 'params'),
  checkProjectMembership,
  async (req, res, next) => {
    try {
      const { projectId } = req.params;

      const projectMembers = await projectMemberService.getProjectMembers(projectId);

      res.status(200).json({ projectMembers });
    } catch (error) {
      next(error);
    }
  }
);

router.post('/:projectId/members',
  validateSession,
  validatorHandler(projectIdSchema, 'params'),
  checkAdminRole,
  validatorHandler(addProjectMember, 'body'),
  async (req, res, next) => {
    try {
      const userId = req.user.sub;
      const{ projectId } = req.params;
      const { workspaceMemberId } = req.body;

      const addedMember = await projectMemberService.addProjectMember(projectId, workspaceMemberId);
      if(!addedMember) throw boom.badRequest('Failed to add member to project');

      res.status(200).json({ message: 'Member was added successfully', addedMember });
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:projectId/members/:projectMemberId',
  validateSession,
  validatorHandler(projectParamsSchemas, 'params'),
  validatorHandler(roleChangeSchema, 'body'),
  checkAdminRole,
  async (req, res, next) => {
    try {
      const { projectId, projectMemberId } = req.params;
      const { newRole } = req.body;

      const updatedMember = await projectMemberService.roleChangeController(projectId, projectMemberId, newRole);
      if(!updatedMember) throw boom.badRequest('Failed to update role');

      res.status(200).json({ message: 'The role has been changed successfully', updatedMember });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
