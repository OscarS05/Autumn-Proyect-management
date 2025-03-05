const boom = require('@hapi/boom');

const WorkspaceService = require('../services/workspace.service');
const workspaceService = new WorkspaceService();

const ProjectService = require('../services/project.service');
const projectService = new ProjectService();


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

module.exports = { authorizationToCreateWorkspace, authorizationToCreateProject };
