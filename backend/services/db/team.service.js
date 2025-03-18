const boom = require('@hapi/boom');

const ACTIONS = {
  MEMBER: [ "leave_team" ],
  ADMIN: [ "remove_member", "change_role", "leave_team" ],
  OWNER: [ "remove_member", "change_role", "leave_team", "transfer_ownership" ]
}

class TeamService {
  constructor(sequelize, models, projectMemberService) {
    this.sequelize = sequelize;
    this.models = models;
    this.projectMemberService = projectMemberService
  }

  async createTeam(name, workspaceId, workspaceMemberId){
    const transaction = await this.sequelize.transaction();
    try {
      const teamCreated = await this.models.Team.create(
        { name, workspaceId, workspaceMemberId },
        { transaction }
      );
      const teamMemberCreated = await this.models.TeamMember.create(
        { workspaceId, workspaceMemberId, teamId: teamCreated.id, role: 'admin', propertyStatus: 'owner' },
        { transaction }
      );

      await transaction.commit();
      return teamCreated?.dataValues;
    } catch (error) {
      await transaction.rollback();
      throw boom.badRequest(error.message || 'Something went wrong while creating the team');
    }
  }

  async updateTeam(name, teamId){
    try {
      const updatedTeam = await this.models.Team.update(
        { name },
        { where: { id: teamId }, returning: true }
      );

      return updatedTeam;
    } catch (error) {
      throw boom.badRequest(error.message || 'Something went wrong while updating team');
    }
  }

  async updateTeamController(name, teamId){
    try {
      const [updatedRows , [updatedTeam]] = await this.updateTeam(name, teamId);
      if(updatedRows === 0) throw boom.notFound('Team not found');

      return updatedTeam;
    } catch (error) {
      throw boom.badRequest(error.message || 'Something went wrong while updating team');
    }
  }

  async assignProject(teamId, projectId){
    try {
      const assignedProject = await this.models.ProjectTeam.create(
        { teamId, projectId }
      );

      return assignedProject;
    } catch (error) {
      throw boom.badRequest(error.message || 'Something went wrong while assigning a project');
    }
  }

  async assignProjectController(workspaceId, teamId, projectId){
    try {
      const teamMembers = await this.getTeamMembers(workspaceId, teamId);
      if(teamMembers.length === 0) throw boom.notFound('Team does not exist');

      const projectMembers = await this.projectMemberService.getProjectMembers(projectId);
      if(projectMembers.length === 0) throw boom.notFound('Project does not exist');

      const nonProjectTeamMembers = teamMembers.filter(teamMember =>
        !projectMembers.some(projectMember => projectMember.workspaceMemberId === teamMember.workspaceMemberId)
      );

      const assignedProject = await this.assignProject(teamId, projectId);

      if(nonProjectTeamMembers.length === 0) return { assignedProject, addedMembers: [] };
      const addedMembers = await Promise.all(
        nonProjectTeamMembers.map(member => this.projectMemberService.addProjectMember(projectId, member.workspaceMemberId))
      );

      return { assignedProject,  addedMembers };
    } catch (error) {
      throw boom.badRequest(error.message || 'Something went wrong while assigning a project');
    }
  }

  async unassignProject(teamId, projectId){
    const transaction = await this.sequelize.transaction();
    try {
      const unassignedProject = await this.models.ProjectTeam.destroy(
        { where: { teamId, projectId }, transaction }
      );
      await transaction.commit();
      return unassignedProject;
    } catch (error) {
      await transaction.rollback();
      throw boom.badRequest(error.message || 'Something went wrong while unassigning a project');
    }
  }

  async unassignProjectController(workspaceId, teamId, projectId, removeTeamMembersFromProject){
    const transaction = await this.sequelize.transaction();
    try {
      const [ team, project, projectTeam ] = await Promise.all([
        this.models.Team.findOne({ where: { id: teamId, workspaceId }, transaction }),
        this.models.Project.findOne({ where: { id: projectId, workspaceId }, transaction }),
        this.models.ProjectTeam.findOne({ where: { teamId, projectId }, transaction }),
      ]);
      if (!team) throw boom.notFound('Team does not exist or does not belong to this workspace');
      if (!project) throw boom.notFound('Project does not exist or does not belong to this workspace');
      if (!projectTeam) throw boom.notFound('Team is not assigned to this project');

      if(!removeTeamMembersFromProject) {
        const unassignedProject = await this.unassignProject(teamId, projectId);
        await transaction.commit();
        return unassignedProject;
      } else if(removeTeamMembersFromProject){
        const response = await this.unassignProjectRemovingMembers(workspaceId, teamId, projectId);
        await transaction.commit();
        return response;
      }
    } catch (error) {
      await transaction.rollback();
      throw boom.badRequest(error.message || 'Something went wrong while unassigning a project');
    }
  }

  async unassignProjectRemovingMembers(workspaceId, teamId, projectId){
    const transaction = await this.sequelize.transaction();
    try {
      const projectMembers = await this.projectMemberService.getProjectMembers(projectId);
      if(projectMembers.length === 0) throw boom.notFound('Project does not exist');

      const teamMembers = await this.getTeamMembers(workspaceId, teamId);
      if(teamMembers.length === 0) throw boom.notFound('Team does not exist');

      const teamMembersOnProject = teamMembers.filter(teamMember =>
        projectMembers.some(projectMember => projectMember.workspaceMemberId === teamMember.workspaceMemberId)
      );
      if(teamMembersOnProject.length === 0) throw boom.notFound('Team members are not part of this project');

      const projectMembersNotInTeam = projectMembers.filter(projectMember =>
        !teamMembers.some(teamMember => teamMember.workspaceMemberId === projectMember.workspaceMemberId)
      );
      if(projectMembersNotInTeam.length === 0){
        throw boom.forbidden(
          'The team cannot be removed from the project because all project members are part of the team. Please, add a new member to the project before unassigning the team'
        );
      }

      const projectMembersInTeam = projectMembers.filter(projectMember =>
        teamMembers.some(teamMember => teamMember.workspaceMemberId === projectMember.workspaceMemberId)
      );
      const teamMemberIsOwnerOnProject = projectMembersInTeam.find(member => member.propertyStatus === 'owner');
      if(teamMemberIsOwnerOnProject){
        const newOwner =
          projectMembersNotInTeam.find(member => member.role === 'admin') ||
          projectMembersNotInTeam.find(member => member.role === 'member');
        if(!newOwner) throw boom.forbidden('Cannot transfer ownership because no suitable owner is available.');

        await this.projectMemberService.transferOwnership(
          projectId, teamMemberIsOwnerOnProject.workspaceMemberId, newOwner.workspaceMemberId
        );
      }

      const unassignedProject = await this.unassignProject(teamId, projectId);

      const removedMembers = await Promise.all(
        projectMembersInTeam.map(member => this.projectMemberService.deleteMember(projectId, member.id))
      );

      await transaction.commit();
      return { unassignedProject, removedMembers };
    } catch (error) {
      await transaction.rollback();
      throw boom.badRequest(error.message || 'Something went wrong while unassigning a project');
    }
  }

  async getTeamsByWorkspace(workspaceId){
    try {
      const teams = await this.models.Team.findAll({
        where: { workspaceId },
        include: [
          {
            model: this.models.TeamMember,
            as: 'teamMembers',
            include: [{
              model: this.models.WorkspaceMember,
              as: 'workspaceMember',
              attributes: ['id', 'userId', 'workspaceId'],
              include: [{
                model: this.models.User,
                as: 'user',
                attributes: ['id', 'name']
              }],
            }]
          },
          {
            model: this.models.Project,
            as: 'projects'
          }
        ],

      });
      return teams;
    } catch (error) {
      throw boom.badRequest(error.message || 'Something went wrong while finding teams');
    }
  }

  async getTeamsByWorkspaceController(workspaceId, requesterUserId){
    try {
      const teams = await this.getTeamsByWorkspace(workspaceId);
      if(teams.length === 0) return [];

      const formattedTeams = teams.map(team => {
        const { teamMembers, owner } = team.teamMembers.reduce((acc, member) => {
          const userData = member.workspaceMember.user;
          const teamMember = {
            teamMemberId: member.id,
            workspaceMemberId: member.workspaceMemberId,
            role: member.role,
            propertyStatus: member.propertyStatus,
            userId: userData.id,
            name: userData.name,
          }
          acc.teamMembers.push(teamMember);

          if(teamMember.propertyStatus === 'owner'){
            acc.owner.name = teamMember.name;
          }

          return acc;
        }, { teamMembers: [], owner: {} });

        const projects = team.projects.map(project => {
          return {
            projectId: project.id,
            // background: project.backgound
            name: project.name
          }
        });

        const formattedData = {
          id: team.id,
          name: team.name,
          owner: owner || { name: "unknown" },
          workspaceId: team.workspaceId,
          members: teamMembers,
          projects: projects,
          requesterActions: []
        };

        let requesterActions = {};
        const requester = teamMembers.find(member => member.userId == requesterUserId);
        if(!requester) return formattedData;

        if(requester.propertyStatus === 'owner'){
          requesterActions = {
            status: requester.propertyStatus,
            canModify: ['admin', 'guest', 'member'],
            actions: ACTIONS.OWNER
          }
        } else if (requester.propertyStatus === 'guest'){
          requesterActions = {
            status: requester.propertyStatus,
            canModify: requester.role == 'admin' ? ['guest', 'member'] : ['member'],
            actions: requester.role == 'admin' ? ACTIONS.ADMIN : ACTIONS.MEMBER
          }
        }

        return {
          ...formattedData,
          requesterActions,
        };
      });

      return formattedTeams
    } catch (error) {
      throw boom.badRequest(error.message || 'Something went wrong while finding teams');
    }
  }

  async getTeamMembers(workspaceId, teamId){
    try {
      const teamMembers = await this.models.TeamMember.findAll(
        { where: { workspaceId, teamId } }
      );

      return teamMembers;
    } catch (error) {
      throw boom.badRequest(error.message || 'Something went wrong while assigning a project');
    }
  }

  async getTeamMembership(workspaceId, workspaceMemberId){
    try {
      const teamMember = await this.models.TeamMember.findOne({
        where: { workspaceId, workspaceMemberId }
      });

      return teamMember;
    } catch (error) {
      throw boom.badRequest(error.message || 'Something went wrong while finding team member');
    }
  }

  async countTeamsByOwnership(workspaceId, workspaceMemberId){
    try {
      const count = await this.models.Team.count(
        { where: { workspaceId, workspaceMemberId } }
      );

      return count;
    } catch (error) {
      throw boom.badRequest(error.message || 'Something went wrong while count teams by ownership');
    }
  }

}

module.exports = TeamService;
