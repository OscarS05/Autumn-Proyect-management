const redis = require('../cache/index');
const jwt = require('jsonwebtoken');
const boom = require('@hapi/boom');

const { config } = require('./../config/config');


class RedisService {
  constructor() {}


  // REFRESH TOKEN
  async saveRefreshToken(userId, refreshToken) {
    const key = `refresh_token:${userId}:${refreshToken.slice(-10)}`;
    await redis.set(key, refreshToken, 'EX', 15 * 24 * 60 * 60);
  }

  async verifyRefreshTokenInRedis(userId, refreshToken) {
    const key = `refresh_token:${userId}:${refreshToken.slice(-10)}`;
    const storedToken = await redis.get(key);
    return storedToken;
  }

  async removeRefreshToken(userId, refreshToken) {
    const key = `refresh_token:${userId}:${refreshToken.slice(-10)}`;
    await redis.del(key);
  }


  // TOKEN TO VERIFY EMAIL
  async saveTokenInRedis(userId, token){
    const key = `token:${userId}:${token.slice(-10)}`;
    await redis.set(key, token, 'EX', 15 * 60);
  }

  async verifyTokenInRedis(userId, token){
    const key = `token:${userId}:${token.slice(-10)}`;
    const storedToken = await redis.get(key);
    if(storedToken !== token) throw boom.unauthorized();
    return storedToken;
  }

  async removeToken(userId, token){
    const key = `token:${userId}:${token.slice(-10)}`;
    await redis.del(key);
  }


  // WORKSPACES
  async saveWorkspaces(userId, workspaces){
    const pipeline = redis.pipeline();
    const workspaceUserKey = `workspaces:${userId}`;

    workspaces.forEach(workspace => {
      const workspaceKey = `workspace:${workspace.id}`;

      pipeline.hset(workspaceKey, Object.entries(workspace).flat());
      pipeline.expire(workspaceKey, 7 * 24 * 60 * 60);

      pipeline.sadd(workspaceUserKey, workspace.id);
    });
    pipeline.expire(workspaceUserKey, 7 * 24 * 60 * 60);

    const result = await pipeline.exec();
  }

  async updateWorkspace(workspace){
    const workspaceKey = `workspace:${workspace.id}`;
    const pipeline = redis.pipeline();
    console.log('workspace', workspace);

    pipeline.hset(workspaceKey, Object.entries(workspace).flat());
    pipeline.expire(workspaceKey, 7 * 24 * 60 * 60);

    const result = await pipeline.exec();
  }

  async deleteWorkspace(userId, workspaceId){
    const pipeline = redis.pipeline();

    const workspaceUserKey = `workspaces:${userId}`;
    const workspaceKey = `workspace:${workspaceId}`;

    pipeline.srem(workspaceUserKey, workspaceId);
    pipeline.del(workspaceKey);

    const result = await pipeline.exec();
  }

  async getAllWorkspaces(userId){
    const userWorkspacesKey = `workspaces:${userId}`;

    const workspaceIds = await redis.smembers(userWorkspacesKey);
    if(workspaceIds.length === 0) return [];

    const pipeline = redis.pipeline();
    workspaceIds.forEach(id => {
      pipeline.hgetall(`workspace:${id}`);
    });

    const workspaces = await pipeline.exec();
    return workspaces.map(result => result[1]);
  }
}

module.exports = RedisService;
