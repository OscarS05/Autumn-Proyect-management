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
}

module.exports = BaseRedisService;
