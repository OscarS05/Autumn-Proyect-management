const boom = require('@hapi/boom');

const { projectService, projectMemberService } = require('../../services/db/index');
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
      throw boom.forbidden('Project limit reached for basic users');
    }

    next();
  } catch (error) {
    console.error("Error in auth middleware:", error);
    next(error);
  }
}

async function checkProjectMembership(req, res, next){
  try {
    const user = req.user;
    const { projectId } = req.params;

    const isMember = await projectMemberService.getProjectMember(projectId, user.sub);
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

    const member = await projectMemberService.getProjectMember(projectId, userId);
    if(member.role !== 'admin'){
      throw boom.forbidden('You do not have permission to perform this action');
    }

    req.projectMember = member;
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  checkAdminRole,
  checkProjectMembership,
  authorizationToCreateProject,
};
