const { Boom } = require('@hapi/boom');
const BaseRedisService = require('./base.redisService');

class ProjectMemberRedisService extends BaseRedisService {
  constructor(redisClient){
    super(redisClient);
  }

  async saveProjectMember(projectId, workspaceMemberId){
    try {
      if (!projectId || !workspaceMemberId) {
        throw Boom.badRequest('projectId or workspaceMemberId or userId not provided');
      }

      const pipeline = this.redis.pipeline();

      pipeline.sadd(this.projectMembers(projectId), workspaceMemberId);
      pipeline.expire(this.projectMembers(projectId), 3 * 24 * 60 * 60);

      const resultPipeline = await pipeline.exec();
      const isSuccessfully = resultPipeline.every(res => res[0] == null);
      if(!isSuccessfully) throw Boom.badRequest('Failed to save project member in Redis');

      return { isSuccessfully };
    } catch (error) {
      throw Boom.badRequest(error.message || 'Failed to save project member');
    }
  }

  async deleteProjectMember(projectId, workspaceMemberId){
    try {
      if (!projectId || !workspaceMemberId) {
        throw Boom.badRequest('projectId or workspaceMemberId or userId not provided');
      }

      const result = this.redis.srem(this.projectMembers(projectId), workspaceMemberId);
      const isSuccessfully = result.every(res => res[0] == null);
      if(!isSuccessfully) throw Boom.badRequest('Failed to delete project member in Redis');

      return { isSuccessfully };
    } catch (error) {
      throw Boom.badRequest(error.message || 'Failed to delete project member');
    }
  }
}

module.exports = ProjectMemberRedisService;
