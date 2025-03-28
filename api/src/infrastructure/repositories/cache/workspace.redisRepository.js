const boom = require('@hapi/boom');
const IWorkspaceCacheRepository = require('../../../domain/repositories/cache/IWorkspaceRepository');

class WorkspaceRedisService extends IWorkspaceCacheRepository {
  constructor(redisClient, projectRedisService, baseRedisRepository){
    super();
    this.redis = redisClient;
    this.projectRedisService = projectRedisService;
    this.baseRedisRepository = baseRedisRepository;
  }

  async saveWorkspace(userId, workspace){
    const pipeline = this.redis.pipeline();
    const workspaceData = {
      id: workspace.id,
      name: workspace.name,
      description: workspace.description,
      userId: workspace.userId,
      type: 'workspace'
    };

    pipeline.hset(this.baseRedisRepository.workspaceKey(workspace.id), ...Object.entries(workspaceData).flat());
    pipeline.expire(this.baseRedisRepository.workspaceKey(workspace.id), 3 * 24 * 60 * 60);

    pipeline.sadd(this.baseRedisRepository.userWorkspacesKey(userId), workspace.id);
    pipeline.expire(this.baseRedisRepository.userWorkspacesKey(userId), 3 * 24 * 60 * 60);

    const result = await pipeline.exec();
    const failedOperations = result.filter(res => res[0] !== null);
    if(failedOperations.length > 0) throw boom.badRequest('Failed to save workspace in Redis: ', failedOperations);
    return result;
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

    pipeline.hset(this.baseRedisRepository.workspaceKey(workspace.id), ...Object.entries(workspaceData).flat());
    pipeline.expire(this.baseRedisRepository.workspaceKey(workspace.id), 3 * 24 * 60 * 60);

    const result = await pipeline.exec();
    const failedOperations = result.filter(res => res[0] !== null);
    if(failedOperations.length > 0) throw boom.badRequest('Failed to update workspace in Redis: ', failedOperations);
    return result;
  }

  async deleteWorkspace(workspaceId){
    return await this.redis.del(this.baseRedisRepository.workspaceKey(workspaceId));
  }

  async getWorkspaceAndItsProjects(workspaceId, userId){
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
  }

  async getUserWorkspaceMemberIds(userId){
    return await this.redis.smembers(this.baseRedisRepository.userWorkspaceMemberIdsKey(userId));
  }

  async getWorkspacesIdsByUser(userId){
    return await this.redis.smembers(this.baseRedisRepository.userWorkspacesKey(userId));
  }

  async getWorkspace(workspaceId){
    return await this.redis.hgetall(this.baseRedisRepository.workspaceKey(workspaceId));
  }

  async getProjectsFromWorkspace(workspaceId){
    return await this.redis.smembers(this.baseRedisRepository.workspaceProjectsKey(workspaceId));
  }
}

module.exports = WorkspaceRedisService;
