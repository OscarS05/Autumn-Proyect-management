const boom = require('@hapi/boom');

const { projectService, projectMemberService } = require('../../../application/services/index');
const { LIMITS } = require('./workspace.authorization');

async function authorizationToCreateProject(req, res, next){
  const user = req.user;
  if(!user) return next(boom.unauthorized('User not authenticated'));
  const { workspaceId, workspaceMemberId } = req.body;
  try {
    const count = await projectService.countProjectsByWorkspaceMember(workspaceId, workspaceMemberId);

    if(user.role === 'basic' && count >= LIMITS.BASIC.PROJECTS){
      throw boom.forbidden('Project limit reached for basic users');
    }
    if(user.role === 'premium' && count >= LIMITS.PREMIUM.PROJECTS){
      throw boom.forbidden('Project limit reached for premium users');
    }

    next();
  } catch (error) {
    next(error);
  }
}

async function checkProjectMembership(req, res, next){
  try {
    const user = req.user;
    const { projectId } = req.params;

    const isMember = await projectMemberService.getProjectMemberByUserId(projectId, user.sub);
    if(!isMember){
      throw boom.forbidden('You do not have permission to perform this action');
    }

    req.projectMember = isMember;
    next();
  } catch (error) {
    next(error);
  }
}

async function checkAdminRole(req, res, next){
  try {
    const userId = req.user.sub;
    const { projectId } = req.params;

    const member = await projectMemberService.getProjectMemberByUserId(projectId, userId);
    if(member.role !== 'admin'){
      throw boom.forbidden('You do not have permission to perform this action');
    }

    req.projectMember = member;
    next();
  } catch (error) {
    next(error);
  }
}

async function checkOwnershipToTransfer(req, res, next){
  try {
    const user = req.user;
    const { projectId } = req.params;
    const { currentOwnerId } = req.body;

    const member = await projectMemberService.getProjectMemberByUserId(projectId, user.sub);
    if(member.propertyStatus !== 'owner' && member.role !== 'admin'){
      throw boom.forbidden('You do not have permission to perform this action');
    }
    if(member.workspaceMemberId !== currentOwnerId){
      throw boom.forbidden('You do not have permission to perform this action');
    }

    req.ownerStatus = member;
    next();
  } catch (error) {
    next(error);
  }
}

async function checkOwnership(req, res, next){
  try {
    const user = req.user;
    const { projectId } = req.params;

    const member = await projectMemberService.getProjectMemberByUserId(projectId, user.sub);
    if(member.propertyStatus !== 'owner'){
      throw boom.forbidden('You do not have permission to perform this action');
    }

    req.ownerStatus = member;
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  checkAdminRole,
  checkProjectMembership,
  authorizationToCreateProject,
  checkOwnershipToTransfer,
  checkOwnership
};
