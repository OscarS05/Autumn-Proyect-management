const sequelize = require('../../infrastructure/store/db/sequelize');
const { models } = require('../../infrastructure/store/db/sequelize');

const redisModels = require('../../infrastructure/repositories/cache/index');

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

const workspaceService = new WorkspaceService(config.sequelize, config.models, redisModels);
const projectService = new ProjectService(config.sequelize, config.models, redisModels);
const projectMemberService = new ProjectMemberService(config.sequelize, config.models, redisModels, projectService);
const workspaceMemberService = new WorkspaceMemberService(config.sequelize, config.models, redisModels, workspaceService, projectService, projectMemberService);
const teamService = new TeamService(config.sequelize, config.models, projectMemberService);


const userUseCases = require('../use-cases/user/index');
const authUseCases = require('../use-cases/auth/index');

const UserService = require('./user.service');

const userService = new UserService(userUseCases);
const authService = new AuthService(authUseCases, userUseCases);

module.exports = {
  userService,
  authService,
  workspaceService,
  workspaceMemberService,
  projectService,
  projectMemberService,
  teamService
};
