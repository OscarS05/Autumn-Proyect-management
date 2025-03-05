const BaseRedisService = require('./base.redisService');

class WorkspaceRedisService extends BaseRedisService {
  constructor(redisClient, projectRedisService){
    super(redisClient);
    this.projectRedisService = projectRedisService;
  }

  async saveWorkspaces(userId, workspaces){
    const pipeline = this.redis.pipeline();
    let projects = [];

    for(let workspace of workspaces) {
      const workspaceData = {
        id: workspace.id,
        name: workspace.name,
        description: workspace.description,
        userId: workspace.userId,
        type: 'workspace'
      };

      pipeline.hset(this.workspaceKey(workspace.id), ...Object.entries(workspaceData).flat());
      pipeline.expire(this.workspaceKey(workspace.id), 3 * 24 * 60 * 60);

      pipeline.sadd(this.userWorkspacesKey(userId), workspace.id);

      if(Array.isArray(workspace.project) && workspace.project.length > 0) {
        const listOfProjects = [...workspace.project].map(project => project.dataValues);
        projects.push(...listOfProjects);
      }
    };

    pipeline.expire(this.userWorkspacesKey(userId), 3 * 24 * 60 * 60);

    const result = await pipeline.exec();

    if(projects.length === 0) return { result, resultSaveProjects: [] };
    const resultSaveProjects = await this.projectRedisService.saveProjects(projects);
    return { result, resultSaveProjects };
  }

  async updateWorkspace(workspace){
    const pipeline = this.redis.pipeline();
    const workspaceData = {
      id: workspace.id,
      name: workspace.name,
      description: workspace.description,
      userId: workspace.userId,
      type: 'workspace'
    };

    pipeline.hset(this.workspaceKey(workspace.id), ...Object.entries(workspaceData).flat());
    pipeline.expire(this.workspaceKey(workspace.id), 3 * 24 * 60 * 60);

    const result = await pipeline.exec();
    return result;
  }

  async deleteWorkspace(userId, workspaceId){
    const pipeline = this.redis.pipeline();

    pipeline.srem(this.userWorkspacesKey(userId), workspaceId);
    pipeline.del(this.workspaceKey(workspaceId));

    const result = await pipeline.exec();
    return result;
  }

  async getWorkspaceAndItsProjects(workspaceId){
    const pipeline = this.redis.pipeline();
    pipeline.hgetall(this.workspaceKey(workspaceId));
    pipeline.smembers(this.workspaceProjectsKey(workspaceId));

    const resultPipeline = await pipeline.exec();
    const { workspace, projectsIds } = resultPipeline.reduce((acc, [_, data]) => {
      if(data){
        if(data.type === 'workspace'){
          acc.workspace = data;
        } else if (Array.isArray(data) && data.length > 0){
          acc.projectsIds.push(...data);
        }
      }
      return acc;
    }, { workspace: null, projectsIds: [] });

    if(!workspace) return { workspace: {}, projects: [] };
    if(projectsIds.length === 0) return { workspace, projects: [] };

    const projects = await this.projectRedisService.getProjects(projectsIds);
    return { workspace, projects };
  }

  async getWorkspacesAndProjects(userId){
    const workspacesIds = await this.redis.smembers(this.userWorkspacesKey(userId));
    if(workspacesIds.length === 0) return { workspaces: [], projects: [] };

    const pipeline = this.redis.pipeline();
    workspacesIds.forEach(workspaceId => {
      pipeline.hgetall(this.workspaceKey(workspaceId));
      pipeline.smembers(this.workspaceProjectsKey(workspaceId));
    });

    const resultPipeline = await pipeline.exec();
    const { workspaces, projectsIds } = resultPipeline.reduce((acc, [_, data]) => {
      if(data){
        if(data.type === 'workspace'){
          acc.workspaces.push(data);
        } else if (Array.isArray(data) && data.length > 0){
          acc.projectsIds.push(...data);
        }
      }
      return acc;
    }, { workspaces: [], projectsIds: [] });

    if(workspaces.length === 0) return { workspaces: [], projects: [] };
    if(projectsIds.length === 0) return { workspaces, projects: [] };

    const projects = await this.projectRedisService.getProjects(projectsIds);
    return { workspaces, projects };
  }

  async getWorkspaces(workspacesIds){
    const pipeline = this.redis.pipeline();

    workspacesIds.forEach(workspacesId => {
      pipeline.hgetall(this.workspaceKey(workspacesId))
    });

    const resultPipeline = await pipeline.exec();
    const workspaces = resultPipeline.reduce((acc, [_, [data]]) => {
      if(data){
        acc.push(data);
      }
      return acc;
    }, []);
    return workspaces;
  }
}

module.exports = WorkspaceRedisService;
