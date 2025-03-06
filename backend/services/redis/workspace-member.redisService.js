const { Boom } = require('@hapi/boom');
const BaseRedisService = require('./base.redisService');

class WorkspaceMemberRedisService extends BaseRedisService {
  constructor(redisClient){
    super(redisClient);
  }

  async saveWorkspaceIdByUserId(userId, workspaceId){
    try {
      if (!userId || !workspaceId) {
        throw Boom.badRequest('userId or workspaceId not provided');
      }

      const pipeline = this.redis.pipeline();

      pipeline.sadd(this.userWorkspacesKey(userId), workspaceId);
      pipeline.sadd(this.workspaceMembers(workspaceId), userId);

      const result = await pipeline.exec();

      const isSuccess = result.every(res => res[0] === null);
      if(!isSuccess) throw Boom.badRequest('Failed to save workspaceId by userId in Redis');

      return { isSuccess };
    } catch (error) {
      console.error('Error:', error);
      throw Boom.badRequest(error.message || 'Failed to save workspaceId by userId in Redis');
    }
  }
}

module.exports = WorkspaceMemberRedisService;
