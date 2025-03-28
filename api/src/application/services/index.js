const sequelize = require('../../infrastructure/store/db/sequelize');
const { models } = require('../../infrastructure/store/db/sequelize');

const redisModels = require('../../infrastructure/repositories/cache/index');

const UserService = require('./user.service');
const AuthService = require('./auth.service');
const WorkspaceService = require('./workspace.service');
const WorkspaceMemberService = require('./workspace-member.service');
const ProjectService = require('./project.service');
const ProjectMemberService = require('./project-member.service');
const TeamService = require('./team.service');


const config = {
  sequelize,
  models,
  redisModels,
}

const userUseCases = require('../use-cases/user/index');
const authUseCases = require('../use-cases/auth/index');
const workspaceUseCases = require('../use-cases/workspace/index');
const workspaceMemberUseCases = require('../use-cases/workspace-member/index');
const projectUseCases = require('../use-cases/project/index');


const userService = new UserService(userUseCases);
const authService = new AuthService(authUseCases, userUseCases);
const workspaceService = new WorkspaceService(workspaceUseCases, projectUseCases);
const workspaceMemberService = new WorkspaceMemberService(workspaceMemberUseCases);

const projectService = new ProjectService(config.sequelize, config.models, redisModels);
const projectMemberService = new ProjectMemberService(config.sequelize, config.models, redisModels, projectService);
const teamService = new TeamService(config.sequelize, config.models, projectMemberService);



module.exports = {
  userService,
  authService,
  workspaceService,
  workspaceMemberService,
  projectService,
  projectMemberService,
  teamService
};
