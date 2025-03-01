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
        workspaceId: project.workspaceId
      }

      pipeline.hset(this.projectKey(project.id), ...Object.entries(projectData).flat());
      pipeline.expire(this.projectKey(project.id), 3 * 24 * 60 * 60);
      pipeline.sadd(this.workspaceProjectsKey(project.workspaceId), project.id);
    });

    const result = await pipeline.exec();
    return result;
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

  async updateProject(project){
    const pipeline = this.redis.pipeline();

    pipeline.hset(this.projectKey(project.id), ...Object.entries(project).flat())
    pipeline.expire(this.projectKey(project.id), 3 * 24 * 60 * 60);

    const pipelineResult = await pipeline.exec();
    return pipelineResult;
  }
}

module.exports = ProjectRedisService;
