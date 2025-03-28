const boom = require('@hapi/boom');
const BaseRedisService = require('./base.redisRepository');

class ProjectRedisService extends BaseRedisService{
  constructor(redisClient){
    super(redisClient);
  }

  async saveProject(project){
    const pipeline = this.redis.pipeline();
    const projectData = {
      id: project.id,
      name: project.name,
      visibility: project.visibility,
      workspaceId: project.workspaceId,
      workspaceMemberId: project.workspaceMemberId
    }

    pipeline.hset(this.projectKey(project.id), ...Object.entries(projectData).flat());
    pipeline.expire(this.projectKey(project.id), 3 * 24 * 60 * 60);

    pipeline.sadd(this.projectMembers(project.id), project.workspaceMemberId);
    pipeline.expire(this.projectMembers(project.id), 3 * 24 * 60 * 60);

    pipeline.sadd(this.workspaceProjectsKey(project.workspaceId), project.id);
    pipeline.sadd(this.workspaceProjectsKey(project.workspaceId), 3 * 24 * 60 * 60);

    const result = await pipeline.exec();
    const failedOperations = result.filter(res => res[0] !== null);
    if(failedOperations.length > 0) throw boom.badRequest('Failed to update workspace in Redis: ', failedOperations);
    return result;
  }

  async updateProject(project){
    try {
      const pipeline = this.redis.pipeline();
      const projectData = {
        id: project.id,
        name: project.name,
        visibility: project.visibility,
        workspaceId: project.workspaceId,
        workspaceMemberId: project.workspaceMemberId
      };

      pipeline.hset(this.projectKey(project.id), ...Object.entries(projectData).flat());
      pipeline.expire(this.projectKey(project.id), 3 * 24 * 60 * 60);

      const pipelineResult = await pipeline.exec();
      const isSuccess = pipelineResult.every(res => res[0] === null);
      if(!isSuccess) throw boom.badRequest('Failed to update project because something went wrong in the pipeline');

      return pipelineResult;
    } catch (error) {
      throw boom.badRequest(error.message || 'Failed to update project');
    }
  }

  async deleteProject(projectId, workspaceId){
    const pipeline = this.redis.pipeline();
    pipeline.del(this.projectMembers(projectId));
    pipeline.srem(this.workspaceProjectsKey(workspaceId), projectId);
    pipeline.del(this.projectKey(projectId));

    const pipelineResult = await pipeline.exec();
    const failedOperations = pipelineResult.filter(res => res[0] !== null);
    if(failedOperations.length > 0) throw boom.badRequest('Failed to save workspace in Redis: ', failedOperations);

    return pipelineResult;
  }

  async findAllProjects(workspaceId){
    try {
      const projectsIds = await this.redis.smembers(this.workspaceProjectsKey(workspaceId));
      if(projectsIds === 0) return [];

      const getProjects = await this.getProjects(projectsIds);
      return getProjects;
    } catch (error) {
      throw boom.badRequest(error.message || 'Failed to get all projects');
    }
  }

  async getProjectsIds(workspacesIds){
    try {
      const pipeline = this.redis.pipeline();

      workspacesIds.forEach(workspaceId => {
        pipeline.smembers(this.workspaceProjectsKey(workspaceId));
      });

      const resultPipeline = await pipeline.exec();
      const isSuccess = resultPipeline.every(res => res[0] === null);
      if(!isSuccess) throw boom.badRequest('Failed to save workspace because something went wrong in the pipeline');

      const projectsIds = resultPipeline.reduce((acc, [_, [data]]) => {
        if(data){
          acc.push(...data);
        }
        return acc;
      }, []);
      return projectsIds;
    } catch (error) {
      throw boom.badRequest(error.message || 'Failed to get projects ids');
    }
  }

  async getProject(projectId){
    return await this.redis.hgetall(this.projectKey(projectId));
  }
}

module.exports = ProjectRedisService;
