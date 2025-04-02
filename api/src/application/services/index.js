const userUseCases = require('../use-cases/user/index');
const authUseCases = require('../use-cases/auth/index');
const workspaceUseCases = require('../use-cases/workspace/index');
const workspaceMemberUseCases = require('../use-cases/workspace-member/index');
const projectUseCases = require('../use-cases/project/index');
const projectMemberUseCases = require('../use-cases/project-member/index');
const teamUseCases = require('../use-cases/team');
const teamMemberUseCases = require('../use-cases/team-member/index');


const UserService = require('./user.service');
const AuthService = require('./auth.service');
const WorkspaceService = require('./workspace.service');
const WorkspaceMemberService = require('./workspace-member.service');
const ProjectService = require('./project.service');
const ProjectMemberService = require('./project-member.service');
const TeamService = require('./team.service');


const userService = new UserService(userUseCases);
const authService = new AuthService(authUseCases, userUseCases);
const workspaceService = new WorkspaceService(workspaceUseCases);
const workspaceMemberService = new WorkspaceMemberService(workspaceMemberUseCases, projectUseCases);
const projectService = new ProjectService(projectUseCases, projectMemberUseCases);
const projectMemberService = new ProjectMemberService(projectMemberUseCases);
const teamService = new TeamService(teamUseCases, teamMemberUseCases, projectMemberUseCases, projectUseCases);



module.exports = {
  userService,
  authService,
  workspaceService,
  workspaceMemberService,
  projectService,
  projectMemberService,
  teamService
};
