const router = require('./project.router');

const boom = require('@hapi/boom');

const { validatorHandler } = require('../middlewares/validator.handler');
const { validateSession } = require('../middlewares/authentication.handler');
const { checkProjectMembership, checkAdminRole, checkOwnershipToTransfer } = require('../middlewares/authorization/project.authorization');

const { projectIdSchema, addProjectMember, roleChangeSchema, projectParamsSchemas, transferOwnership } = require('../schemas/project-members.schema');

const { projectMemberService } = require('../../application/services/index');

router.get('/:projectId/members',
  validateSession,
  validatorHandler(projectIdSchema, 'params'),
  checkProjectMembership,
  async (req, res, next) => {
    try {
      const { projectId } = req.params;

      const { projectMembers, teams } = await projectMemberService.controllerGetProjectMembers(projectId);

      res.status(200).json({ projectMembers, teams });
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

      const addedMember = await projectMemberService.addProjectMemberController(projectId, workspaceMemberId);
      if(!addedMember) throw boom.badRequest('Failed to add member to project');

      res.status(201).json({ message: 'Member was added successfully', addedMember });
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

router.patch('/:projectId/ownership',
  validateSession,
  validatorHandler(projectIdSchema, 'params'),
  validatorHandler(transferOwnership, 'body'),
  checkOwnershipToTransfer,
  async (req, res, next) => {
    try {
      const { projectId } = req.params;
      const { currentOwnerId, newOwnerId } = req.body;

      const updatedProject = await projectMemberService.transferOwnership(projectId, currentOwnerId, newOwnerId);
      if(!updatedProject) throw boom.notFound('Workspace or new owner not found');

      res.status(200).json({ updatedProject });
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:projectId/members/:projectMemberId',
  validateSession,
  validatorHandler(projectParamsSchemas, 'params'),
  checkAdminRole,
  async (req, res, next) => {
    try {
      const { projectId, projectMemberId } = req.params;
      const requesterData = req.projectMember.dataValues;

      const deletedMember = await projectMemberService.removeMemberController(projectId, projectMemberId, requesterData);
      if(deletedMember === 0) throw boom.badRequest('Failed to delete the member');

      res.status(200).json({ message: 'Member was removed successfully' });
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:projectId/members',
  validateSession,
  validatorHandler(projectIdSchema, 'params'),
  checkProjectMembership,
  async (req, res, next) => {
    try {
      const { projectId } = req.params;
      const requesterData = req.projectMember;

      const removedMember = await projectMemberService.leaveTheProject(projectId, requesterData);
      if(removedMember === 0) throw boom.badRequest('Failed to leave the project');

      res.status(200).json({ message: 'You have successfully left the project' });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
