const BaseRedisService = require('./base.redisService');

class ProjectRedisService extends BaseRedisService{
  constructor(redisClient){
    super(redisClient);
  }

  async saveProjects(projects){
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

      pipeline.sadd(this.workspaceProjectsKey(project.workspaceId), project.id);
      pipeline.sadd(this.workspaceProjectsKey(project.workspaceId), 3 * 24 * 60 * 60);
    });

    const result = await pipeline.exec();
    return result;
  }

  async updateProject(project){
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
    return pipelineResult;
  }

  async deleteProject(projectId, workspaceId){
    const pipeline = this.redis.pipeline();

    pipeline.srem(this.workspaceProjectsKey(workspaceId), projectId);
    pipeline.del(this.projectKey(projectId));

    const pipelineResult = await pipeline.exec();
    return pipelineResult;
  }

  async findAllProjects(workspaceId){
    const projectsIds = await this.redis.smembers(this.workspaceProjectsKey(workspaceId));
    if(projectsIds === 0) return [];

    const getProjects = await this.getProjects(projectsIds);
    return getProjects;
  }

  async getProjectsIds(workspacesIds){
    const pipeline = this.redis.pipeline();

    workspacesIds.forEach(workspaceId => {
      pipeline.smembers(this.workspaceProjectsKey(workspaceId));
    });

    const resultPipeline = await pipeline.exec();
    const projectsIds = resultPipeline.reduce((acc, [_, [data]]) => {
      if(data){
        acc.push(...data);
      }
      return acc;
    }, []);
    return projectsIds;
  }

  async getProjects(projectsIds){
    if (projectsIds.length === 0) return [];
    const pipeline = this.redis.pipeline();

    projectsIds.forEach(projectId => {
      pipeline.hgetall(this.projectKey(projectId));
    });

    const result = await pipeline.exec();
    const projects = result.reduce((acc, [_, data]) => {
      if (data && Object.keys(data).length > 0) {
        acc.push(data);
      }
      return acc;
    }, []);
    if(projects.length === 0) return [];

    return projects;
  }
}

module.exports = ProjectRedisService;
