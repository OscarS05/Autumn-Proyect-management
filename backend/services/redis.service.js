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
        type: 'workspace'
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

  async getWorkspaceWithProjects(workspaceId){
    const pipeline = redis.pipeline();
    const pipelineProjects = redis.pipeline();

    const workspaceKey = `workspace:${workspaceId}`;
    const workspaceProjectsKey = `workspace:${workspaceId}:projects`;
    const projectKey = (projectId) => `project:${projectId}`;

    pipeline.hgetall(workspaceKey);
    pipeline.smembers(workspaceProjectsKey);

    const result = await pipeline.exec();

    const { workspace, projectsIds } = result.reduce((acc, [_, data]) => {
      if(data){
        if(data.type === 'workspace'){
          acc.workspace.push(data);
        } else if(Array.isArray(data) && data.length > 0){
          acc.projectsIds.push(...data);
        }
      }
      return acc;
    }, { workspace: [], projectsIds: [] });
    if(!workspace) return { workspace: [], projects: []};
    if(projectsIds.length === 0) return { workspace, projects: []};

    projectsIds.forEach(id => {
      pipelineProjects.hgetall(projectKey(id));
    });

    const projects = (await pipelineProjects.exec()).map(([_, data]) => data);
    if(!projects) return { workspace, projects: []};

    return { workspace, projects};
  }

  async getWorkspacesAndProjects(userId){
    const pipeline = redis.pipeline();
    const pipelineProjects = redis.pipeline();

    const userWorkspacesKey = `user:${userId}:workspaces`;
    const workspacesKey = (workspaceId) => `workspace:${workspaceId}`;
    const workspaceProjectsKey = (workspaceId) => `workspace:${workspaceId}:projects`;
    const projectKey = (projectId) => `project:${projectId}`;

    const workspaceIds = await redis.smembers(userWorkspacesKey);
    if(workspaceIds.length === 0) return { workspaces: [], projects: [] };

    workspaceIds.forEach(workspaceId => {
      pipeline.hgetall(workspacesKey(workspaceId));
      pipeline.smembers(workspaceProjectsKey(workspaceId));
    });

    const result = await pipeline.exec();
    const { workspaces, projectsIds } = result.reduce((acc, [_, data]) => {
      if(data){
        if(data.type === 'workspace'){
          acc.workspaces.push(data);
        } else if (Array.isArray(data) && data.length > 0){
          acc.projectsIds.push(...data);
        }
      }
      return acc;
    }, { workspaces: [], projectsIds: [] });

    if(!workspaces) return { workspaces: [], projects: [] };
    if(projectsIds.length === 0) return { workspaces, projects: [] };

    projectsIds.forEach(projectId => {
      pipelineProjects.hgetall(projectKey(projectId));
    });
    const projects = (await pipelineProjects.exec()).map(result => result[1]);

    return { workspaces, projects };
  }


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


// class RedisService {
//   constructor(redisClient) {
//     this.redis = redisClient; // Inyectamos la dependencia
//   }

//   async getWorkspaces(userId) {
//     const userWorkspacesKey = `user:${userId}:workspaces`;
//     const workspaceIds = await this.redis.smembers(userWorkspacesKey);
//     if (workspaceIds.length === 0) return [];

//     const pipeline = this.redis.pipeline();
//     workspaceIds.forEach(workspaceId => {
//       pipeline.hgetall(`workspace:${workspaceId}`);
//     });

//     const result = await pipeline.exec();
//     return result.map(([_, data]) => data);
//   }

//   async getProjects(workspaceIds) {
//     const pipeline = this.redis.pipeline();
//     workspaceIds.forEach(workspaceId => {
//       pipeline.smembers(`workspace:${workspaceId}:projects`);
//     });

//     const result = await pipeline.exec();
//     const projectsIds = result.flatMap(([_, data]) => data);
//     if (projectsIds.length === 0) return [];

//     const projectPipeline = this.redis.pipeline();
//     projectsIds.forEach(projectId => {
//       projectPipeline.hgetall(`project:${projectId}`);
//     });

//     const projects = (await projectPipeline.exec()).map(result => result[1]);
//     return projects;
//   }

//   async getWorkspacesAndProjects(userId) {
//     const workspaces = await this.getWorkspaces(userId);
//     if (!workspaces.length) return { workspaces: [], projects: [] };

//     const projects = await this.getProjects(workspaces.map(ws => ws.id));
//     return { workspaces, projects };
//   }
// }
