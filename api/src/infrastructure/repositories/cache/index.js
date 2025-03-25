const redisClient = require('../../store/cache/index');

const AuthRedisService = require('./auth.redisService');
const WorkspaceRedisService = require('./workspace.redisService');
const WorkspaceMemberRedisService = require('./workspace-member.redisService');
const ProjectRedisService = require('./project.redisService');
const ProjectMemberRedisService = require('./project-member.redisService');

const config = {
  redisClient: redisClient
}

const AuthRedis = new AuthRedisService(config.redisClient);
const ProjectRedis = new ProjectRedisService(config.redisClient);
const WorkspaceRedis = new WorkspaceRedisService(config.redisClient, ProjectRedis);
const WorkspaceMemberRedis = new WorkspaceMemberRedisService(config.redisClient);
const ProjectMemberRedis = new ProjectMemberRedisService(config.redisClient);

module.exports = {
  AuthRedis,
  WorkspaceRedis,
  WorkspaceMemberRedis,
  ProjectRedis,
  ProjectMemberRedis
};
