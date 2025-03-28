const redisClient = require('../../store/cache/index');

const BaseRedisService = require('./base.redisRepository');
const AuthRedisRepository = require('./auth.redisRepository');
const WorkspaceRedisService = require('./workspace.redisRepository');
const WorkspaceMemberRedisService = require('./workspace-member.redisRepository');
const ProjectRedisService = require('./project.redisRepository');
const ProjectMemberRedisService = require('./project-member.redisRepository');

const config = {
  redisClient: redisClient
}

const baseRedisService = new BaseRedisService(config.redisClient);
const AuthRedis = new AuthRedisRepository(config.redisClient);
const ProjectRedis = new ProjectRedisService(config.redisClient);
const WorkspaceRedis = new WorkspaceRedisService(config.redisClient, ProjectRedis, baseRedisService);
const WorkspaceMemberRedis = new WorkspaceMemberRedisService(config.redisClient);
const ProjectMemberRedis = new ProjectMemberRedisService(config.redisClient);

module.exports = {
  AuthRedis,
  WorkspaceRedis,
  WorkspaceMemberRedis,
  ProjectRedis,
  ProjectMemberRedis
};
