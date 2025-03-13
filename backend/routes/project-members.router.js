const router = require('./project.router');

const { Boom } = require('@hapi/boom');

const { validateSession } = require('../middlewares/authentication.handler');
const { checkProjectMembership, checkAdminRole } = require('../middlewares/authorization/project.authorization');
const { validatorHandler } = require('../middlewares/validator.handler');

const { projectIdSchema, addProjectMember } = require('../schemas/project-members.schema');

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
      if(!addedMember) throw Boom.badRequest('Failed to add member to project');

      res.status(200).json({ message: 'Member was added successfully', addedMember });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
