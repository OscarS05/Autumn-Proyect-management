const sequelize = require('../../libs/sequelize');
const { models } = require('../../libs/sequelize');

const redisModels = require('../redis/index');

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

const userService = new UserService(config.sequelize, config.models);
const authService = new AuthService(config.sequelize, config.models, userService, redisModels);
const workspaceService = new WorkspaceService(config.sequelize, config.models, redisModels);
const projectService = new ProjectService(config.sequelize, config.models, redisModels);
const projectMemberService = new ProjectMemberService(config.sequelize, config.models, redisModels, projectService);
const workspaceMemberService = new WorkspaceMemberService(config.sequelize, config.models, redisModels, workspaceService, projectService, projectMemberService);
const teamService = new TeamService(config.sequelize, config.models);

module.exports = {
  userService,
  authService,
  workspaceService,
  workspaceMemberService,
  projectService,
  projectMemberService,
  teamService
};
