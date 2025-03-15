const boom = require('@hapi/boom');

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

}

module.exports = TeamService;
