class BaseRedisService {
  constructor(redisClient) {
    this.redis = redisClient;
  }

  userWorkspacesKey(userId) {
    return `user:${userId}:workspaces`;
  }

  userWorkspaceMemberIdsKey(userId){
    return `user:${userId}:workspaceMembersIds`;
  }

  workspaceMember(workspaceMemberId){
    return `workspaceMember:${workspaceMemberId}`;
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
}

module.exports = BaseRedisService;
