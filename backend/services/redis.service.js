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
    const userWorkspacesKey = `user:${userId}:workspaces`;

    workspaces.forEach(workspace => {
      const workspaceKey = `workspace:${workspace.id}`;
      const workspaceData = { ...workspace, type: "workspace" }

      pipeline.hset(workspaceKey, ...Object.entries(workspaceData).flat());
      pipeline.expire(workspaceKey, 7 * 24 * 60 * 60);

      pipeline.sadd(userWorkspacesKey, workspace.id);
    });

    const ttl = await redis.ttl(userWorkspacesKey);
    if(ttl === -1 || ttl === -2){
      pipeline.expire(userWorkspacesKey, 7 * 24 * 60 * 60);
    }

    const result = await pipeline.exec();
    return result;
  }

  async updateWorkspace(workspace){
    const pipeline = redis.pipeline();
    const workspaceKey = `workspace:${workspace.id}`;
    const workspaceData = { ...workspace, type: "workspace" };

    pipeline.hset(workspaceKey, Object.entries(workspaceData).flat());

    const ttl = await redis.ttl(workspaceKey);
    if(ttl === -1 || ttl === -2){
      pipeline.expire(workspaceKey, 7 * 24 * 60 * 60);
    }

    const result = await pipeline.exec();

    return result;
  }

  async deleteWorkspace(userId, workspaceId){
    const pipeline = redis.pipeline();

    const userWorkspacesKey = `user:${userId}:workspaces`;
    const workspaceKey = `workspace:${workspaceId}`;

    pipeline.srem(userWorkspacesKey, workspaceId);
    pipeline.del(workspaceKey);

    const result = await pipeline.exec();
    return result;
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

  // async getWorkspace(userId){
  //   const userWorkspacesKey = `workspaces:${userId}`;

  //   const workspaceIds = await redis.smembers(userWorkspacesKey);
  //   if(workspaceIds.length === 0) return [];

  //   const pipeline = redis.pipeline();
  //   workspaceIds.forEach(id => {
  //     pipeline.hgetall(`workspace:${id}`);
  //   });

  //   const workspaces = await pipeline.exec();
  //   return workspaces.map(result => result[1]);
  // }


  // PROJECTS
  async saveProjects(workspaceId, projects){
    const pipeline = redis.pipeline();
    const workspaceProjectsKey = `workspace:${workspaceId}:projects`;

    projects.forEach(project => {
      const projectKey = `project:${project.id}`;
      const projectData = { ...project, type: "project" };

      pipeline.hset(projectKey, ...Object.entries(projectData).flat());
      pipeline.expire(projectKey, 7 * 24 * 60 * 60);

      pipeline.sadd(workspaceProjectsKey, project.id);
    });

    const ttl = await redis.ttl(workspaceProjectsKey);
    if(ttl === -1 || ttl === -2){
      pipeline.expire(workspaceProjectsKey, 7 * 24 * 60 * 60);
    }

    const result = await pipeline.exec();
    return result;
  }

  // async getWorkspacesAndProjects(userId){
  //   const pipeline = redis.pipeline();

  //   const userWorkspacesKey = `user:${userId}:workspaces`;
  //   const workspacesKey = (workspaceId) => `workspace:${workspaceId}`;
  //   const workspaceProjectsKey = (workspaceId) => `workspace:${workspaceId}:projects`;
  //   const projectKey = (projectId) => `project:${projectId}`;

  //   const workspaceIds = await redis.smembers(userWorkspacesKey);
  //   if(workspaceIds.length === 0) return { workspaces: [], projects: [] };


  //   workspaceIds.forEach(workspaceId => {
  //     pipeline.hgetall(workspacesKey(workspaceId));
  //     pipeline.smembers(workspaceProjectsKey(workspaceId));
  //   });

  //   const results = await pipeline.exec();

  //   let workspaces = [];
  //   let projectsIds = [];

  //   results.forEach(([_, data]) => {
  //     if(data.type === "workspace"){
  //       workspaces.push(data);
  //     } else if (data.type === "project"){
  //       projectsIds.push(...data);
  //     }
  //   });

  //   if(projectsIds.length === 0) return { workspaces, projects: [] };

  //   projectsIds.forEach(projectId => {
  //     pipeline.hgetall(projectKey(projectId));
  //   });
  //   const projects = (await pipeline.exec()).map(result => result[1]);

  //   return { workspaces, projects };
  // }
}

module.exports = RedisService;
