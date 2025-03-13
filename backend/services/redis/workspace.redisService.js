const boom = require('@hapi/boom');
const BaseRedisService = require('./base.redisService');

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
      const isSuccessfully = result.every(res => res[0] === null);
      if(!isSuccessfully) throw boom.badRequest('Failed to save workspace because something went wrong in the pipeline');

      if(projects.length === 0) return { result, resultSaveProjects: [] };
      const resultSaveProjects = await this.projectRedisService.saveProjects(projects);
      return { result, resultSaveProjects };
    } catch (error) {
      throw boom.badRequest(error.message || 'Failed to save workspace');
    }
  }

  async updateWorkspace(workspace){
    try {
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
      const isSuccessfully = result.every(res => res[0] === null);
      if(!isSuccessfully) throw boom.badRequest('Failed to update workspace because something went wrong in the pipeline');

      return result;
    } catch (error) {
      throw boom.badRequest(error.message || 'Failed to update workspace');
    }
  }

  async deleteWorkspace(workspaceId){
    try {
      if(!workspaceId) throw boom.badRequest('workspaceId not provided');
      const [ workspaceMembersIds, workspaceProjects ] = await Promise.all([
        this.redis.smembers(this.workspaceMembers(workspaceId)),
        this.redis.smembers(this.workspaceProjectsKey(workspaceId)),
      ]);

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
      if(!isSuccess) throw boom.badRequest('Failed to save workspace because something went wrong in the pipeline');

      return isSuccess;
    } catch (error) {
      throw boom.badRequest(error.message || 'Failed to delete workspace');
    }
  }

  async getWorkspaceAndItsProjects(workspaceId, userId){
    try {
      const workspaceAndProjectsIds = await this.getWorkspacesAndProjectsIds([workspaceId]);
      const { workspace, projectsIds } = workspaceAndProjectsIds.reduce((acc, [_, data]) => {
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

      const [ projects, workspaceMemberIds ] = await Promise.all([
        this.projectRedisService.getProjects(projectsIds),
        this.getUserWorkspaceMemberIds(userId),
      ]);
      const data = { workspaces: [workspace], projects };

      const organizedData = await this.structureData(data, workspaceMemberIds);
      return organizedData;
    } catch (error) {
      throw boom.badRequest(error.message || 'Failed to get workspaces and its projects');
    }
  }

  async getWorkspacesAndProjects(userId){
    try {
      const workspacesIds = await this.getWorkspacesIdsByUser(userId);
      if(workspacesIds.length === 0) return { workspaces: [], projects: [] };

      const workspacesAndProjects = await this.getWorkspacesAndProjectsIds(workspacesIds);
      const { workspaces, projectsIds } = workspacesAndProjects.reduce((acc, [_, data]) => {
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

      const [ projects, workspaceMemberIds ] = await Promise.all([
        this.projectRedisService.getProjects(projectsIds),
        this.getUserWorkspaceMemberIds(userId),
      ]);

      const data = { workspaces, projects };
      const structuredData = await this.structureData(data, workspaceMemberIds);
      const organizedWorkspaces = structuredData.reduce((acc, data) => {
        if(data.userId == userId){
          acc.owner.push(data);
        } else if(data.userId !== userId){
          acc.guest.push(data);
        }
        return acc;
      }, { owner: [], guest: [] });

      return organizedWorkspaces;
    } catch (error) {
      throw boom.badRequest(error.message || 'Failed to get workspaces and their projects');
    }
  }

  async structureData(data, workspaceMemberIds){
    try {
      const listOfWorkspaces = await Promise.all(data.workspaces.map(async (workspace) => {
        const relatedProjects = data.projects.filter(project => project.workspaceId === workspace.id);
        const projectWithAccess = await Promise.all(relatedProjects.map(async (project) => {
          const isMember = await this.canAccessProject(project.id, workspaceMemberIds);
          return {
            ...project,
            id: Number(project.id),
            workspaceId: Number(project.workspaceId),
            workspaceMemberId: Number(project.workspaceMemberId),
            access: isMember,
          };
        }));
        return {
          ...workspace,
          id: Number(workspace.id),
          userId: Number(workspace.userId),
          projects: projectWithAccess
        };
      }));

      return listOfWorkspaces;
    } catch (error) {
      throw boom.badRequest(error.message || 'Failed to structure data');
    }
  }

  async canAccessProject(projectId, workspaceMemberIds) {
    try {
      const members = await this.redis.smembers(`project:${projectId}:members`);
      const isMember = members.some(id => workspaceMemberIds.includes(id));
      return isMember;
    } catch (error) {
      throw boom.badRequest(error.message || 'Failed to check access to project');
    }
  }

  async getUserWorkspaceMemberIds(userId){
    try {
      const workspaceMemberIds = await this.redis.smembers(this.userWorkspaceMemberKey(userId));
      if(workspaceMemberIds === null || workspaceMemberIds === undefined) throw boom.badRequest('Error: Failed to retrieve members');
      return workspaceMemberIds;
    } catch (error) {
      throw boom.badRequest(error.message || 'Failed to get user workspace member ids');
    }
  }

  async getWorkspacesIdsByUser(userId){
    try {
      const workspacesIds = await this.redis.smembers(this.userWorkspacesKey(userId));
      if(workspacesIds === null || workspacesIds === undefined) throw boom.badRequest('Error: Failed to retrieve workspaces ids');
      return workspacesIds;
    } catch (error) {
      throw boom.badRequest(error.message || 'Failed to get workspaces ids by user');
    }
  }

  async getWorkspacesAndProjectsIds(workspacesIds){
    try {
      const pipeline = this.redis.pipeline();
      workspacesIds.forEach(workspaceId => {
        pipeline.hgetall(this.workspaceKey(workspaceId));
        pipeline.smembers(this.workspaceProjectsKey(workspaceId));
      });

      const resultPipeline = await pipeline.exec();
      const isSuccessfully = resultPipeline.every(res => res[0] === null);
      if(!isSuccessfully) throw boom.badRequest('Failed to get workspaces or projects ids');

      return resultPipeline
    } catch (error) {
      throw boom.badRequest(error.message || 'Failed to get workspaces and their projects ids');
    }
  }

  async getWorkspaces(workspacesIds){
    try {
      const pipeline = this.redis.pipeline();

      workspacesIds.forEach(workspacesId => {
        pipeline.hgetall(this.workspaceKey(workspacesId))
      });

      const resultPipeline = await pipeline.exec();
      const isSuccess = result.every(res => res[0] === null);
      if(!isSuccess) throw boom.badRequest('Failed to get workspaces because something went wrong in the pipeline');

      const workspaces = resultPipeline.reduce((acc, [_, [data]]) => {
        if(data){
          acc.push(data);
        }
        return acc;
      }, []);
      return workspaces;
    } catch (error) {
      throw boom.badRequest(error.message || 'Failed to get workspaces');
    }
  }
}

module.exports = WorkspaceRedisService;
