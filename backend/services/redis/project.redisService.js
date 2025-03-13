const boom = require('@hapi/boom');
const BaseRedisService = require('./base.redisService');

class ProjectRedisService extends BaseRedisService{
  constructor(redisClient){
    super(redisClient);
  }

  async saveProjects(projects){
    try {
      if (!projects?.length) return [];
      const pipeline = this.redis.pipeline();

      projects.forEach(project => {
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
      });

      const result = await pipeline.exec();
      const isSuccess = result.every(res => res[0] === null);
      if(!isSuccess) throw boom.badRequest('Failed to save projects because something went wrong in the pipeline');

      return result;
    } catch (error) {
      throw boom.badRequest(error.message || 'Failed to save projects in Redis');
    }
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
    try {
      const pipeline = this.redis.pipeline();

      pipeline.del(this.projectMembers(projectId));
      pipeline.srem(this.workspaceProjectsKey(workspaceId), projectId);
      pipeline.del(this.projectKey(projectId));

      const pipelineResult = await pipeline.exec();
      const isSuccess = pipelineResult.every(res => res[0] === null);
      if(!isSuccess) throw boom.badRequest('Failed to delete project because something went wrong in the pipeline');

      return pipelineResult;
    } catch (error) {
      throw boom.badRequest(error.message || 'Failed to delete project');
    }
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

  async getProjects(projectsIds){
    try {
      if (projectsIds.length === 0) return [];
      const pipeline = this.redis.pipeline();

      projectsIds.forEach(projectId => {
        pipeline.hgetall(this.projectKey(projectId));
      });

      const result = await pipeline.exec();
      const isSuccess = result.every(res => res[0] === null);
      if(!isSuccess) throw boom.badRequest('Failed to get projects because something went wrong in the pipeline');

      const projects = result.reduce((acc, [_, data]) => {
        if (data && Object.keys(data).length > 0) {
          acc.push(data);
        }
        return acc;
      }, []);
      if(projects.length === 0) return [];

      return projects;
    } catch (error) {
      throw boom.badRequest(error.message || 'Failed to get projects');
    }
  }
}

module.exports = ProjectRedisService;
