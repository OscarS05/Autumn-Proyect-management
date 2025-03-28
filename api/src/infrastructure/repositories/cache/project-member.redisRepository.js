const boom = require('@hapi/boom');
const BaseRedisService = require('./base.redisRepository');

class ProjectMemberRedisService extends BaseRedisService {
  constructor(redisClient){
    super(redisClient);
  }

  async saveProjectMember(projectId, workspaceMemberId){
    try {
      if (!projectId || !workspaceMemberId) {
        throw boom.badRequest('projectId or workspaceMemberId or userId not provided');
      }

      const pipeline = this.redis.pipeline();

      pipeline.sadd(this.projectMembers(projectId), workspaceMemberId);
      pipeline.expire(this.projectMembers(projectId), 3 * 24 * 60 * 60);

      const resultPipeline = await pipeline.exec();
      const isSuccessfully = resultPipeline.every(res => res[0] == null);
      if(!isSuccessfully) throw boom.badRequest('Failed to save project member in Redis');

      return { isSuccessfully };
    } catch (error) {
      throw boom.badRequest(error.message || 'Failed to save project member');
    }
  }

  async deleteProjectMember(projectId, workspaceMemberId){
    try {
      if (!projectId || !workspaceMemberId) {
        throw boom.badRequest('projectId or workspaceMemberId or userId not provided');
      }

      const result = this.redis.srem(this.projectMembers(projectId), workspaceMemberId);
      if (result === 0) throw boom.badRequest('No members were removed in Redis');

      return result;
    } catch (error) {
      throw boom.badRequest(error.message || 'Failed to delete project member');
    }
  }

  async getProjectMemberIds(projectId) {
    return await this.redis.smembers(this.projectMembers(projectId));
  }
}

module.exports = ProjectMemberRedisService;
