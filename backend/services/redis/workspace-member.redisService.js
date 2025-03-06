const { Boom } = require('@hapi/boom');
const BaseRedisService = require('./base.redisService');

class WorkspaceMemberRedisService extends BaseRedisService {
  constructor(redisClient){
    super(redisClient);
  }

  async saveWorkspaceIdByUserId(userId, workspaceId){
    try {
      if(!workspaceId) throw Boom.badRequest('WorkspaceId not provided');
      if(!userId) throw Boom.badRequest('userId not provided');

      const result = await this.redis.sadd(this.userWorkspacesKey(userId), workspaceId);
      const members = await this.redis.smembers(this.userWorkspacesKey(userId));
      console.log('members:', members);
      return result;
    } catch (error) {
      throw Boom.badRequest(error.message || 'Failed to save workspaceId by userId in Redis');
    }
  }
}

module.exports = WorkspaceMemberRedisService;
