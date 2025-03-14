const { Boom } = require('@hapi/boom');
const BaseRedisService = require('./base.redisService');
const { DatabaseModule } = require('@faker-js/faker');

class WorkspaceRedisService extends BaseRedisService {
  constructor(redisClient, projectRedisService){
    super(redisClient);
    this.projectRedisService = projectRedisService;
  }

  async saveWorkspaces(userId, workspaces){
    try {
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
        pipeline.sadd(this.workspaceMembers(workspace.id), userId);
        pipeline.expire(this.workspaceMembers(workspace.id), 3 * 24 * 60 * 60);

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
    } catch (error) {
      console.error('Error:', error);
      throw Boom.badRequest(error.message || 'Failed to delete workspace');
    }
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

  async deleteWorkspace(workspaceId){
    try {
      if(!workspaceId) throw Boom.badRequest('workspaceId not provided');

      const workspaceMembersIds = await this.redis.smembers(this.workspaceMembers(workspaceId));
      const workspaceProjects = await this.redis.smembers(this.workspaceProjectsKey(workspaceId));
      const pipeline = this.redis.pipeline();

      workspaceMembersIds.forEach(memberId => {
        pipeline.srem(this.userWorkspacesKey(memberId), workspaceId);
      });
      workspaceProjects.forEach(projectId => {
        pipeline.del(this.projectKey(projectId));
      });
      pipeline.del(this.workspaceMembers(workspaceId));
      pipeline.del(this.workspaceKey(workspaceId));

      const result = await pipeline.exec();

      const isSuccess = result.every(res => res[0] === null);
      if(!isSuccess) throw Boom.badRequest('Failed to delete all workspace data in Redis');

      return { isSuccess };
    } catch (error) {
      console.error('Error:', error);
      throw Boom.badRequest(error.message || 'Failed to delete workspace');
    }
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
    const data = { workspaces: [workspace], projects };

    const organizedData = this.organizeData(data);
    return organizedData;
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
    const data = { workspaces, projects };

    const organizedData = this.organizeData(data);
    const structuredWorkspaces = organizedData.reduce((acc, data) => {
      if(data.userId == userId){
        acc.owner.push(data);
      } else if(data.userId !== userId){
        acc.guest.push(data);
      }
      return acc;
    }, { owner: [], guest: [] });
    return structuredWorkspaces;
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

  organizeData(data){
    const listOfWorkspaces = data.workspaces.map(workspace => {
      const relatedProjects = data.projects.filter(project => project.workspaceId === workspace.id);
      return {
        ...workspace,
        id: Number(workspace.id),
        userId: Number(workspace.userId),
        projects: relatedProjects.map(project => ({
          ...project,
          id: Number(project.id),
          workspaceId: Number(project.workspaceId),
          workspaceMemberId: Number(project.workspaceMemberId)
        }))
      };
    });

    return listOfWorkspaces;
  }
}

module.exports = WorkspaceRedisService;
