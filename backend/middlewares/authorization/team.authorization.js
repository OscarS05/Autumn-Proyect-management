const boom = require('@hapi/boom');

const { teamService } = require('../../services/db/index');
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
    const user = req.user;
    const { workspaceId } = req.params;
    const workspaceMember = req.workspaceMemberStatus;

    const teamMember = await teamService.getTeamMembership(workspaceId, workspaceMember.id);
    if(!teamMember){
      throw boom.forbidden('You do not have permission to perform this action');
    }

    req.projectMember = teamMember;
    next();
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

// async function checkOwnership(req, res, next){
//   try {
//     const user = req.user;
//     const { projectId } = req.params;
//     const { currentOwnerId } = req.body;

//     const member = await projectMemberService.getProjectMemberByUserId(projectId, user.sub);
//     if(member.propertyStatus !== 'owner' && member.role !== 'admin'){
//       throw boom.forbidden('You do not have permission to perform this action');
//     }
//     if(member.workspaceMemberId !== currentOwnerId){
//       throw boom.forbidden('You do not have permission to perform this action');
//     }

//     req.ownerStatus = member;
//     next();
//   } catch (error) {
//     next(error);
//   }
// }

module.exports = {
  authorizationToCreateTeam,
  checkTeamMembership
};
