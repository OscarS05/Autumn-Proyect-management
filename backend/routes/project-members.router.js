const router = require('./project.router');

const { Boom } = require('@hapi/boom');

const { validateSession } = require('../middlewares/authentication.handler');
const { checkProjectMembership } = require('../middlewares/authorization.handler');
const { getProjectMembersSchema } = require('../schemas/project-members.schema');
const { validatorHandler } = require('../middlewares/validator.handler');

const { projectMemberService } = require('../services/db/index');

router.get('/:projectId/members',
  validateSession,
  validatorHandler(getProjectMembersSchema, 'params'),
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

module.exports = router;
