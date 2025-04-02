const boom = require('@hapi/boom');

class TeamService {
  constructor({
      countTeamsUseCase,
      createTeamUseCase,
      getTeamUseCase,
      getProjectAssignedUseCase,
      getAllProjectsAssignedUseCase,
      getTeamsByWorkspaceUseCase,
      assignProjectUseCase,
      updateTeamUseCase,
      unassignProjectUseCase,
      deleteTeamUseCase
    },
    { getTeamMembersByIdUseCase, getTeamMemberUseCase },
    { getProjectMembersByProjectUseCase },
    { getProjectUseCase }
  ) {
    // Team use cases
    this.getAllProjectsAssignedUseCase = getAllProjectsAssignedUseCase;
    this.getProjectAssignedUseCase = getProjectAssignedUseCase;
    this.getTeamUseCase = getTeamUseCase;
    this.getTeamsByWorkspaceUseCase = getTeamsByWorkspaceUseCase;
    this.countTeamsUseCase = countTeamsUseCase;
    this.createTeamUseCase = createTeamUseCase;
    this.assignProjectUseCase = assignProjectUseCase;
    this.updateTeamUseCase = updateTeamUseCase;
    this.unassignProjectUseCase = unassignProjectUseCase;
    this.deleteTeamUseCase = deleteTeamUseCase;

    // Team memeber use cases
    this.getTeamMembersByIdUseCase = getTeamMembersByIdUseCase;
    this.getTeamMemberUseCase = getTeamMemberUseCase;

    // Project member use cases
    this.getProjectMembersByProjectUseCase = getProjectMembersByProjectUseCase;

    // Project use cases
    this.getProjectUseCase = getProjectUseCase;
  }

  async createTeam(teamData){
    return await this.createTeamUseCase.execute(teamData);
  }

  async updateTeam(teamId, name){
    return await this.updateTeamUseCase.execute(teamId, name);
  }

  async assignProject(workspaceId, teamId, projectId){
    const [ teamMembers, projectMembers ] = await Promise.all([
      this.getTeamMembers(teamId, workspaceId),
      this.getProjectMembersByProjectUseCase.execute(projectId),
    ]);

    if(teamMembers.length === 0) throw boom.notFound('No team members found');
    if(projectMembers.length === 0) throw boom.notFound('No project members found');

    return await this.assignProjectUseCase.execute(teamMembers, projectMembers, teamId, projectId);
  }

  async unassignProject(workspaceId, teamId, projectId, removeTeamMembersFromProject){
    const [ team, project, projectTeam, teamMembers, projectMembers ] = await Promise.all([
      this.getTeam(teamId, workspaceId),
      this.getProjectUseCase.execute(projectId),
      this.getProjectAssigned(teamId, projectId),
      this.getTeamMembers(teamId, workspaceId),
      this.getProjectMembersByProjectUseCase.execute(projectId),
    ]);
    if (!team) throw boom.notFound('Team does not exist or does not belong to this workspace');
    if (!project) throw boom.notFound('Project does not exist or does not belong to this workspace');
    if (!projectTeam) throw boom.notFound('Team is not assigned to this project');
    if (teamMembers.length === 0) throw boom.notFound('Team does not have any members');
    if(projectMembers.length === 0) throw boom.notFound('Project does not have any members');

    return await this.unassignProjectUseCase.execute(removeTeamMembersFromProject, teamMembers, projectMembers, teamId, projectId);
  }

  async deleteTeam(workspaceId, teamId){
    const [ team, teamProjects, teamMembers ] = await Promise.all([
      this.getTeam(teamId, workspaceId),
      this.getProjectsAssigned(teamId),
      this.getTeamMembers(teamId, workspaceId),
    ]);

    if(!team?.id) throw boom.notFound('Team not found');
    if(teamProjects.length === 0) return await this.deleteTeamUseCase.execute(teamId, []);

    const projectMembersPerAssignedProject = await Promise.all(
      teamProjects.map(teamProject => this.getProjectMembersByProjectUseCase.execute(teamProject.projectId)),
    );

    const projectMembersInTeam = await Promise.all(
      projectMembersPerAssignedProject.map(membersOfProjectAssigned => {
        const projectId = membersOfProjectAssigned.length > 0 ? membersOfProjectAssigned[0].projectId : null;
        return this.unassignProjectUseCase.handleTeamMembersInProject(teamMembers, membersOfProjectAssigned, projectId)
      })
    );

    const flattenedProjectMembersInTeam = projectMembersInTeam.flat();
    return await this.deleteTeamUseCase.execute(teamId, flattenedProjectMembersInTeam);
  }

  async getProjectsAssigned(teamId){
    return await this.getAllProjectsAssignedUseCase.execute(teamId);
  }

  async getProjectAssigned(teamId, projectId){
    return await this.getProjectAssignedUseCase.execute(teamId, projectId);
  }

  async getTeam(teamId, workspaceId){
    return await this.getTeamUseCase.execute(teamId, workspaceId);
  }

  async getTeamsByWorkspace(requesterAsWorkspaceMember){
    return await this.getTeamsByWorkspaceUseCase.execute(requesterAsWorkspaceMember);
  }

  async getTeamMembers(teamId, workspaceId){
    return await this.getTeamMembersByIdUseCase.execute(teamId, workspaceId);
  }

  async getTeamMemberByUserId(userId, workspaceId, teamId){
    return await this.getTeamMemberUseCase.execute(userId, workspaceId, teamId);
  }

  async countTeams(workspaceMemberId){
    return await this.countTeamsUseCase.execute(workspaceMemberId);
  }
}

module.exports = TeamService;
