const { Boom } = require("@hapi/boom");

class ProjectMemberService {
  constructor(sequelize, models, redisModels){
    this.sequelize = sequelize;
    this.models = models;
    this.redisModels = redisModels;
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
