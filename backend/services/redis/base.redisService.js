class BaseRedisService {
  constructor(redisClient) {
    this.redis = redisClient;
  }

  userWorkspacesKey(userId) {
    return `user:${userId}:workspaces`;
  }

  workspaceKey(workspaceId) {
    return `workspace:${workspaceId}`;
  }

  workspaceProjectsKey(workspaceId) {
    return `workspace:${workspaceId}:projects`;
  }

  projectKey(projectId) {
    return `project:${projectId}`;
  }

  workspaceMembers(workspaceId){
    return `workspace:${workspaceId}:members`;
  }

  async set(key, value, expiration = null) {
    if (expiration) {
      return this.redis.set(key, JSON.stringify(value), "EX", expiration);
    }
    return this.redis.set(key, JSON.stringify(value));
  }

  async get(key) {
    const data = await this.redis.get(key);
    return data || null;
  }

  async del(key) {
    await this.redis.del(key);
  }

  // async executePipeline(ids, keyFunction, redisCommand) {
  //   const pipeline = this.redis.pipeline();
  //   ids.forEach(id => pipeline[redisCommand](keyFunction(id)));
  //   return (await pipeline.exec()).map(result => result[1]);
  // }
}

module.exports = BaseRedisService;
