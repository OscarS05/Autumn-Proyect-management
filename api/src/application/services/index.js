const userUseCases = require('../use-cases/user/index');
const authUseCases = require('../use-cases/auth/index');
const workspaceUseCases = require('../use-cases/workspace/index');
const workspaceMemberUseCases = require('../use-cases/workspace-member/index');
const projectUseCases = require('../use-cases/project/index');
const projectMemberUseCases = require('../use-cases/project-member/index');
const teamUseCases = require('../use-cases/team');
const teamMemberUseCases = require('../use-cases/team-member/index');
const listUseCases = require('../use-cases/list/index');
const cardUseCases = require('../use-cases/card/index');


const UserService = require('./user.service');
const AuthService = require('./auth.service');
const WorkspaceService = require('./workspace.service');
const WorkspaceMemberService = require('./workspace-member.service');
const ProjectService = require('./project.service');
const ProjectMemberService = require('./project-member.service');
const TeamService = require('./team.service');
const TeamMemberService = require('./team-member.service');
const ListService = require('./list.service');
const CardService = require('./card.service');


const userService = new UserService(userUseCases);
const authService = new AuthService(authUseCases, userUseCases);
const workspaceService = new WorkspaceService(workspaceUseCases);
const workspaceMemberService = new WorkspaceMemberService(workspaceMemberUseCases, projectUseCases, teamUseCases);
const projectService = new ProjectService(projectUseCases, projectMemberUseCases);
const projectMemberService = new ProjectMemberService(projectMemberUseCases);
const teamService = new TeamService(teamUseCases, teamMemberUseCases, projectMemberUseCases, projectUseCases);
const teamMemberService = new TeamMemberService(teamMemberUseCases, teamService);
const listService = new ListService(listUseCases);
const cardService = new CardService(cardUseCases);


module.exports = {
  userService,
  authService,
  workspaceService,
  workspaceMemberService,
  projectService,
  projectMemberService,
  teamService,
  teamMemberService,
  listService,
  cardService
};
