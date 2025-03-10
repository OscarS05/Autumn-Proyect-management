const { Boom } = require('@hapi/boom');
const BaseRedisService = require('./base.redisService');

class ProjectMemberRedisService extends BaseRedisService {
  constructor(redisClient){
    super(redisClient);
  }

  async saveProjectMember(projectId, workspaceMemberId, userId){
    try {
      if (!projectId || !workspaceMemberId || !userId) {
        throw Boom.badRequest('projectId or workspaceMemberId or userId not provided');
      }

      const pipeline = this.redis.pipeline();

      pipeline.sadd(this.userWorkspaceMemberKey(userId), workspaceMemberId);
      pipeline.expire(this.userWorkspaceMemberKey(userId), 3 * 24 * 60 * 60);

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
}

module.exports = ProjectMemberRedisService;
