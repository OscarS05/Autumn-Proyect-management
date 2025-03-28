const boom = require('@hapi/boom');
const BaseRedisService = require('./base.redisRepository');

class WorkspaceMemberRedisService extends BaseRedisService {
  constructor(redisClient){
    super(redisClient);
  }

  async saveWorkspaceMember(userId, workspaceId, workspaceMemberId, role){
    const pipeline = this.redis.pipeline();

    pipeline.sadd(this.userWorkspacesKey(userId), workspaceId);
    pipeline.expire(this.userWorkspacesKey(userId), 3 * 24 * 60 * 60);

    pipeline.sadd(this.userWorkspaceMemberIdsKey(userId), workspaceMemberId);
    pipeline.expire(this.userWorkspaceMemberIdsKey(userId), 3 * 24 * 60 * 60);

    pipeline.hset(this.workspaceMember(workspaceMemberId), ...Object.entries({ userId, workspaceMemberId, workspaceId, role }).flat())
    pipeline.expire(this.workspaceMember(workspaceMemberId), 3 * 24 * 60 * 60);

    const result = await pipeline.exec();
    const failedOperations = result.filter(res => res[0] !== null);
    if(failedOperations.length > 0) throw boom.badRequest('Failed to save workspace in Redis: ', failedOperations);

    return result;
  }

  async getWorkspaceMember(workspaceMemberId){
    return await this.redis.hgetall(this.workspaceMember(workspaceMemberId));
  }

  async deleteMember(userId, workspaceId, workspaceMemberId){
    const pipeline = this.redis.pipeline();

    pipeline.srem(this.userWorkspaceMemberIdsKey(userId), workspaceMemberId);
    pipeline.srem(this.userWorkspacesKey(userId), workspaceId);
    pipeline.del(this.workspaceMember(workspaceMemberId));

    const resultPipeline = await pipeline.exec();
    const failedOperations = resultPipeline.filter(res => res[0] !== null);
    if(failedOperations.length > 0) throw boom.badRequest('Failed to save workspace in Redis: ', failedOperations);
    return isSuccessful;
  }
}

module.exports = WorkspaceMemberRedisService;
