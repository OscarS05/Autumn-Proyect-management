const boom = require('@hapi/boom');
const BaseRedisService = require('./base.redisService');

class WorkspaceMemberRedisService extends BaseRedisService {
  constructor(redisClient){
    super(redisClient);
  }

  async saveWorkspaceIdByUserId(userId, workspaceIds, workspaceMemberIds){
    try {
      if (!userId || workspaceIds.length === 0 || workspaceMemberIds.length === 0) {
        throw boom.badRequest('userId or workspaceId not provided');
      }

      const pipeline = this.redis.pipeline();

      workspaceIds.forEach(workspaceId => {
        pipeline.sadd(this.workspaceMembersByUserId(workspaceId), userId);
        pipeline.expire(this.workspaceMembersByUserId(workspaceId), 3 * 24 * 60 * 60);

        pipeline.sadd(this.userWorkspacesKey(userId), workspaceId);
      });
      pipeline.expire(this.userWorkspacesKey(userId), 3 * 24 * 60 * 60);

      workspaceMemberIds.forEach(workspaceMemberId => {
        pipeline.sadd(this.userWorkspaceMemberKey(userId), workspaceMemberId);
      });
      pipeline.expire(this.userWorkspaceMemberKey(userId), 3 * 24 * 60 * 60);

      const result = await pipeline.exec();
      const isSuccess = result.every(res => res[0] === null);
      if(!isSuccess) throw boom.badRequest('Failed to save workspaceId by userId in Redis because something went wrong in the pipeline');

      return { isSuccess };
    } catch (error) {
      throw boom.badRequest(error.message || 'Failed to save workspaceId by userId in Redis');
    }
  }

  async deleteMember(userId, workspaceId, workspaceMemberId){
    try {
      const pipeline = this.redis.pipeline();

      pipeline.srem(this.userWorkspaceMemberKey(userId), workspaceMemberId);
      pipeline.srem(this.workspaceMembersByUserId(workspaceId), userId);
      pipeline.srem(this.userWorkspacesKey(userId), workspaceId);

      const resultPipeline = await pipeline.exec();
      const isSuccessful = resultPipeline.every(res => res[0] == null);
      if(!isSuccessful) throw boom.badRequest('Failed to remove workspace in Redis');

      return isSuccessful;
    } catch (error) {
      throw boom.badRequest(error.message || 'Failed to remove workspace in Redis');
    }
  }
}

module.exports = WorkspaceMemberRedisService;
