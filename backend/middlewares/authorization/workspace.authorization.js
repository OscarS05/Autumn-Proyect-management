const boom = require('@hapi/boom');

const { workspaceService, workspaceMemberService } = require('../../services/db/index');

const LIMITS = {
  BASIC: { WORKSPACES: 6, PROJECTS: 10 },
  PREMIUM: { WORKSPACES: 20, PROJECTS: 25 },
}

async function authorizationToCreateWorkspace(req, res, next){
  const user = req.user;
  if(!user) return next(boom.unauthorized('User not authenticated'));
  try {
    const count = await workspaceService.countWorkspacesByUserId(user.sub);

    if(user.role === 'basic' && count >= LIMITS.BASIC.WORKSPACES){
      throw boom.forbidden('Workspace limit reached for basic users');
    }
    if(user.role === 'premium' && count >= LIMITS.PREMIUM.WORKSPACES){
      throw boom.forbidden('Workspace limit reached for premium users');
    }

    next();
  } catch (error) {
    console.error("Error in auth middleware:", error);
    next(error);
  }
}

async function checkAdminRole(req, res, next){
  const user = req.user;
  const { workspaceId } = req.params;
  try {
    const memberStatus = await workspaceMemberService.findStatusByUserId(workspaceId, user.sub);
    if(memberStatus.role !== 'admin'){
      throw boom.forbidden('You do not have permission to perform this action');
    }

    req.workspaceMemberStatus = memberStatus;
    next();
  } catch (error) {
    next(error);
  }
}

async function checkOwnership(req, res, next){
  try {
    const user = req.user;
    const { workspaceId } = req.params;
    const memberStatus = await workspaceMemberService.findStatusByUserId(workspaceId, user.sub);
    if(memberStatus.propertyStatus !== 'owner'){
      throw boom.forbidden('You do not have permission to perform this action');
    }

    req.ownerStatus = memberStatus;
    next();
  } catch (error) {
    next(error);
  }
}

async function checkWorkspaceMembership(req, res, next){
  try {
    const user = req.user;
    const { workspaceId } = req.params;

    const isMember = await workspaceMemberService.checkWorkspaceMembership(workspaceId, user.sub);
    if(!isMember){
      throw boom.forbidden('You do not have permission to perform this action');
    }

    req.workspaceMemberStatus = isMember;
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  LIMITS,
  authorizationToCreateWorkspace,
  checkAdminRole,
  checkOwnership,
  checkWorkspaceMembership,
};
