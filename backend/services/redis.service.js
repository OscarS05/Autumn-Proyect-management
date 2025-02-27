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

    let projects = [];

    for(let workspace of workspaces) {
      const workspaceKey = `workspace:${workspace.id}`;
      const workspaceData = {
        id: workspace.id,
        name: workspace.name,
        description: workspace.description,
        userId: workspace.userId,
      };

      pipeline.hset(workspaceKey, ...Object.entries(workspaceData).flat());
      pipeline.expire(workspaceKey, 3 * 24 * 60 * 60);

      pipeline.sadd(userWorkspacesKey, workspace.id);

      if(Array.isArray(workspace.project) && workspace.project.length > 0) {
        const listOfProjects = [...workspace.project].map(project => project.dataValues);
        projects.push(...listOfProjects);
      }
    };

    pipeline.expire(userWorkspacesKey, 3 * 24 * 60 * 60);

    const resultSaveProjects = await this.saveProjects(projects);
    const result = await pipeline.exec();
    return { result, resultSaveProjects };
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

  async getWorkspacesAndProjects(userId){
    const pipelineWorkspaces = redis.pipeline();
    const pipelineProjectsIds = redis.pipeline();
    const pipelineProjects = redis.pipeline();

    const userWorkspacesKey = `user:${userId}:workspaces`;
    const workspacesKey = (workspaceId) => `workspace:${workspaceId}`;
    const workspaceProjectsKey = (workspaceId) => `workspace:${workspaceId}:projects`;
    const projectKey = (projectId) => `project:${projectId}`;

    const workspaceIds = await redis.smembers(userWorkspacesKey);
    if(workspaceIds.length === 0) return { workspaces: [], projects: [] };


    workspaceIds.forEach(workspaceId => {
      pipelineWorkspaces.hgetall(workspacesKey(workspaceId));
      pipelineProjectsIds.smembers(workspaceProjectsKey(workspaceId));
    });
    const resultWorkspaces = await pipelineWorkspaces.exec();
    const resultProjectIds = await pipelineProjectsIds.exec();

    // Cambiar por .map()
    const  workspaces = resultWorkspaces.map(([_, data]) => data || {});
    const projectsIds = resultProjectIds.flatMap(([_, [data]]) => data || []);
    if(projectsIds.length === 0) return { workspaces, projectsIds: [] };

    projectsIds.forEach(projectId => {
      pipelineProjects.hgetall(projectKey(projectId));
    });
    const projects = (await pipelineProjects.exec()).map(result => result[1]);

    return { workspaces, projects };
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
  async saveProjects(projects){
    if (projects.length === 0) return [];
    const pipeline = redis.pipeline();

    projects.forEach(project => {
      const workspaceProjectsKey = `workspace:${project.workspaceId}:projects`;
      const projectKey = `project:${project.id}`;
      const projectData = {
        id: project.id,
        name: project.name,
        visibility: project.visibility,
        workspaceId: project.workspaceId
      }

      pipeline.hset(projectKey, ...Object.entries(projectData).flat());
      pipeline.expire(projectKey, 3 * 24 * 60 * 60);
      pipeline.sadd(workspaceProjectsKey, project.id);
    });

    const result = await pipeline.exec();
    return result;
  }
}

module.exports = RedisService;
