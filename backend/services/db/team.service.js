const boom = require('@hapi/boom');

const ACTIONS = {
  MEMBER: [ "leave_team" ],
  ADMIN: [ "remove_member", "change_role", "leave_team" ],
  OWNER: [ "remove_member", "change_role", "leave_team", "transfer_ownership" ]
}

class TeamService {
  constructor(sequelize, models) {
    this.sequelize = sequelize;
    this.models = models;
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
