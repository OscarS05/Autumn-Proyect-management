class BaseRedisService {
  constructor(redisClient) {
    this.redis = redisClient;
  }

  userWorkspacesKey(userId) {
    return `user:${userId}:workspaces`;
  }

  userWorkspaceMemberKey(userId){
    return `user:${userId}:workspaceMembers`;
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

  projectMembers(projectId){
    return `project:${projectId}:members`;
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
}

module.exports = BaseRedisService;
