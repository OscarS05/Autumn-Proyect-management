const { Boom } = require("@hapi/boom");

class ProjectMemberService {
  constructor(sequelize, models, redisModels){
    this.sequelize = sequelize;
    this.models = models;
    this.redisModels = redisModels;
  }

  async addProjectMember(projectId, workspaceMemberId, userId){
    const transaction = await this.sequelize.transaction();
    try {
      const isMember = await this.models.ProjectMember.findOne({
        where: { projectId, workspaceMemberId },
        transaction
      });
      if(isMember) throw Boom.conflict('Workspace member is already part of this project');

      const addedMember = await this.models.ProjectMember.create(
        { workspaceMemberId, role: 'member', propertyStatus: 'guest', projectId },
        { transaction }
      );

      await this.redisModels.ProjectMemberRedis.saveProjectMember(
        addedMember.projectId,
        addedMember.workspaceMemberId,
        userId
      );

      await transaction.commit();
      return addedMember.dataValues;
    } catch (error) {
      await transaction.rollback();
      throw Boom.badRequest(error.message || 'Failed to add member to project');
    }
  }

  async getProjectMembers(projectId){
    try {
      const projectMembers = await this.models.ProjectMember.findAll(
        { where: { projectId } }
      );

      return projectMembers;
    } catch (error) {
      throw Boom.badRequest(error.message || 'Failed to find project members');
    }
  }

  async getProjectMember(projectId, userId){
    try {
      const projectMembers = await this.models.ProjectMember.findOne({
        where: { projectId },
        include: [{
          model: this.models.WorkspaceMember,
          as: 'workspaceMember',
          attributes: [],
          where: { userId }
        }]
      });

      return projectMembers.dataValues;
    } catch (error) {
      throw Boom.badRequest(error.message || 'Failed to find project members');
    }
  }
}

module.exports = ProjectMemberService;
