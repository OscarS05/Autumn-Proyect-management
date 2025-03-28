const logger = require("../../../../utils/logger/logger");
const ProjectDto = require("../../dtos/project.dto");
const WorkspaceDto = require("../../dtos/workspace.dto");

class GetWorkspacesAndProjects {
  constructor({ workspaceRepository }, { WorkspaceRedis, WorkspaceMemberRedis, ProjectRedis, ProjectMemberRedis }){
    this.workspaceRepository = workspaceRepository;
    this.WorkspaceRedis = WorkspaceRedis;
    this.WorkspaceMemberRedis = WorkspaceMemberRedis;
    this.ProjectRedis = ProjectRedis;
    this.ProjectMemberRedis = ProjectMemberRedis;
  }

  async execute(userId){
    const workspacesInRedis = await this.getWorkspacesInRedis(userId);
    if(workspacesInRedis.length >= 1) return workspacesInRedis;

    const workspacesInDb = await this.getWorkspacesInDb(userId);
    if(workspacesInDb.length >= 1) return workspacesInDb;

    return [];
  }

  async getWorkspacesInDb(userId){
    const workspaceMembers = await this.workspaceRepository.findAll(userId);
    if(workspaceMembers.length === 0) return [];

    const workspaceWithProjects = workspaceMembers.map(workspaceMember => workspaceMember.workspace);
    const workspaceMemberIds = workspaceMembers.map(member => member.id);
    const projects = workspaceWithProjects.flatMap(workspace => workspace.projects);
    const workspaces = workspaceWithProjects.map(workspace => workspace);

    const structuredWorkspaces = workspaceWithProjects.map(workspace => {
      const relatedProjects = workspace.projects.map(project => {
        return {
          ...project.toJSON(),
          access: project.projectMembers.some(member => workspaceMemberIds.includes(member.workspaceMemberId)),
        }
      });

      return {
        ...workspace.toJSON(),
        projects: relatedProjects,
        role: workspaceMembers.find(member => member.userId === userId)?.role || 'member'
      };
    });

    try {
      await Promise.all([
        ...workspaces.map(workspace => this.WorkspaceRedis.saveWorkspace(userId, workspace)),
        ...projects.map(project => this.ProjectRedis.saveProject(project)),
        ...workspaceMembers.map(workspaceMember =>
          this.WorkspaceMemberRedis.saveWorkspaceMember(userId, workspaceMember.workspaceId, workspaceMember.id, workspaceMember.role)),
      ]);
    } catch (error) {
      logger.warn('❗Failed to save workspaces and projects in Redis by error: ', error);
    }
    return structuredWorkspaces.map(workspace => WorkspaceDto.fromEntity(workspace, userId));
  }

  async getWorkspacesInRedis(userId){
    const workspacesIds = await this.WorkspaceRedis.getWorkspacesIdsByUser(userId);
    if (!workspacesIds || workspacesIds.length === 0) return [];

    const [ workspaces, projectsIds ] = await Promise.all([
      Promise.all(workspacesIds.map(workspaceId => this.WorkspaceRedis.getWorkspace(workspaceId))),
      Promise.all(workspacesIds.map(workspaceId => this.WorkspaceRedis.getProjectsFromWorkspace(workspaceId))),
    ]);

    const formattedWorkspaces = workspaces.filter(workspace => workspace?.id);
    const formattedProjectsIds = projectsIds.flat().filter(id => id);

    if(formattedWorkspaces.length === 0) return [];
    if(formattedProjectsIds.filter(project => project).length === 0){
      return formattedWorkspaces.map(workspace => WorkspaceDto.fromEntity(workspace, userId))
    }

    const [ projects, workspaceMemberIds ] = await Promise.all([
      Promise.all(formattedProjectsIds.map(projectId => this.ProjectRedis.getProject(projectId))),
      this.WorkspaceRedis.getUserWorkspaceMemberIds(userId),
    ]);

    if(projects.length === 0 || workspaceMemberIds.length === 0){
      return formattedWorkspaces.map(workspace => WorkspaceDto.fromEntity(workspace, userId));
    }

    const formattedProjects = projects.filter(projects => projects?.id);
    const workspaceMemberData = await Promise.all(workspaceMemberIds.map(id => this.WorkspaceMemberRedis.getWorkspaceMember(id)));

    return this.structureData({ workspaces: formattedWorkspaces, projects: formattedProjects }, workspaceMemberIds, workspaceMemberData);
  }

  async structureData(data, workspaceMemberIds, workspaceMemberData = []){
    return Promise.all(data.workspaces.map(async (workspace) => {
      const relatedProjects = data.projects.filter(project => project.workspaceId === workspace.id);
      const projectsWithAccess = await Promise.all(relatedProjects.map(async (project) => {
        const projectMemberIds = await this.ProjectMemberRedis.getProjectMemberIds(project.id);
        const isMember = projectMemberIds.some(id => workspaceMemberIds.includes(id));
        return ProjectDto.fromEntity({ ...project, access: isMember })
      }));
      return WorkspaceDto.fromEntity({
        ...workspace,
        projects: projectsWithAccess,
        role: workspaceMemberData.find(member => member.workspaceId === workspace.id)?.role || 'member'
      });
    }));
  }
}

module.exports = GetWorkspacesAndProjects;
