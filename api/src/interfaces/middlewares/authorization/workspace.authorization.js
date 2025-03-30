const boom = require('@hapi/boom');

const { workspaceService, workspaceMemberService } = require('../../../application/services/index');

const LIMITS = {
  BASIC: { WORKSPACES: 6, PROJECTS: 10, TEAMS: 10 },
  PREMIUM: { WORKSPACES: 20, PROJECTS: 25, TEAMS: 25 },
}

async function authorizationToCreateWorkspace(req, res, next){
  const user = req.user;
  if(!user) return next(boom.unauthorized('User not authenticated'));
  try {
    const count = await workspaceService.countWorkspacesByUserId(user.sub);

    if(user?.role === 'basic' && count >= LIMITS.BASIC.WORKSPACES){
      throw boom.forbidden('Workspace limit reached for basic users');
    }
    if(user?.role === 'premium' && count >= LIMITS.PREMIUM.WORKSPACES){
      throw boom.forbidden('Workspace limit reached for premium users');
    }

    next();
  } catch (error) {
    next(error);
  }
}

async function checkAdminRole(req, res, next){
  const user = req.user;
  const { workspaceId } = req.params;
  try {
    const workspaceMember = await workspaceMemberService.getWorkspaceMemberByUserId(workspaceId, user.sub);
    if(!workspaceMember) throw boom.notFound('Workspace member not found');
    if(workspaceMember.role === 'member') throw boom.forbidden('You do not have the admin role to perfom this action');

    req.workspaceMember = workspaceMember;
    next();
  } catch (error) {
    next(error);
  }
}

async function checkOwnership(req, res, next){
  try {
    const user = req.user;
    const { workspaceId } = req.params;

    const workspaceMember = await workspaceMemberService.getWorkspaceMemberByUserId(workspaceId, user.sub);
    if(!workspaceMember) throw boom.notFound('Workspace member not found');
    if(workspaceMember.propertyStatus === 'owner') throw boom.forbidden('You do not have the ownership to perfom this action');

    req.workspaceMember = workspaceMember;
    next();
  } catch (error) {
    next(error);
  }
}

async function checkWorkspaceMembership(req, res, next){
  try {
    const user = req.user;
    const { workspaceId } = req.params;

    const workspaceMember = await workspaceMemberService.getWorkspaceMemberByUserId(workspaceId, user.sub);
    if(!workspaceMember?.id) throw boom.forbidden('You cannot perform this action because you do not belong to the workspace');

    req.workspaceMember = workspaceMember;
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
