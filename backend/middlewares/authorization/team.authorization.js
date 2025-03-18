const boom = require('@hapi/boom');

const { teamService, workspaceMemberService, projectMemberService } = require('../../services/db/index');
const { LIMITS } = require('./workspace.authorization');

async function authorizationToCreateTeam(req, res, next){
  try {
    const user = req.user;
    if(!user) throw boom.unauthorized('User not authenticated');

    const { workspaceId  } = req.params;
    const workspaceMemberId = req.workspaceMemberStatus.id;

    const count = await teamService.countTeamsByOwnership(workspaceId, workspaceMemberId);
    if(user.role === 'basic' && count >= LIMITS.BASIC.TEAMS){
      throw boom.forbidden('Team limit reached for basic users');
    }
    if(user.role === 'premium' && count >= LIMITS.PREMIUM.TEAMS){
      throw boom.forbidden('Team limit reached for premium users');
    }

    next();
  } catch (error) {
    console.error("Error in auth middleware:", error);
    next(error);
  }
}

async function checkTeamMembership(req, res, next){
  try {
    const { workspaceId } = req.params;
    const workspaceMember = req.workspaceMemberStatus;

    const teamMember = await teamService.getTeamMembership(workspaceId, workspaceMember.id);
    if(!teamMember) throw boom.forbidden('You do not have permission to perform this action');
    if(teamMember.role !== 'admin')throw boom.forbidden('You do not have permission to perform this action');

    req.teamMember = teamMember;
    next();
  } catch (error) {
    next(error);
  }
}

async function checkAdminRoleToAssign(req, res, next){
  try {
    const userId = req.user.sub;
    const { workspaceId, projectId } = req.params;

    const member = await workspaceMemberService.checkWorkspaceMembership(workspaceId, userId);
    if(!member) throw boom.forbidden('You do not belong in the workspace');
    if(member.role === 'admin'){
      req.workspaceMember = member;
      return next();
    } else if(member.role === 'member'){
      const projectMember = await projectMemberService.getProjectMemberByUserId(projectId, userId);
      if(!projectMember) throw boom.forbidden('You do not belong in the project');
      if(projectMember.role !== 'admin') throw boom.forbidden('You do not have permission to perform this action');

      req.projectMember = projectMember;
      return next();
    }

    throw boom.forbidden('You do not have permission to perform this action');
  } catch (error) {
    next(error);
  }
}

// async function checkAdminRole(req, res, next){
//   try {
//     const userId = req.user.sub;
//     const { projectId } = req.params;

//     const member = await projectMemberService.getProjectMemberByUserId(projectId, userId);
//     if(member.role !== 'admin'){
//       throw boom.forbidden('You do not have permission to perform this action');
//     }

//     req.projectMember = member;
//     next();
//   } catch (error) {
//     next(error);
//   }
// }

async function checkTeamOwnership(req, res, next){
  try {
    const { workspaceId } = req.params;
    const workspaceMember = req.workspaceMemberStatus;

    const teamMember = await teamService.getTeamMembership(workspaceId, workspaceMember.id);
    if(!teamMember) throw boom.forbidden('You do not have permission to perform this action');
    if(teamMember.propertyStatus !== 'owner') throw boom.forbidden('You do not have permission to perform this action');

    req.teamMember = teamMember;
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  authorizationToCreateTeam,
  checkAdminRoleToAssign,
  checkTeamMembership,
  checkTeamOwnership
};
