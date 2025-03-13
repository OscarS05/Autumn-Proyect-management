const boom = require("@hapi/boom");

class ProjectMemberService {
  constructor(sequelize, models, redisModels){
    this.sequelize = sequelize;
    this.models = models;
    this.redisModels = redisModels;
  }

  async addProjectMember(projectId, workspaceMemberId){
    const transaction = await this.sequelize.transaction();
    try {
      const workspaceMember = await this.models.WorkspaceMember.findOne({
        where: { id: workspaceMemberId },
        include: [{
          model: this.models.Workspace,
          as: 'workspace',
          required: true,
          attributes: ['id', 'name'],
          include: [{
            model: this.models.Project,
            as: 'project',
            where: { id: projectId },
            required: true,
            attributes: ['id', 'workspaceId']
          }]
        }],
        attributes: ['id', 'workspaceId'],
        transaction
      });
      if(!workspaceMember) throw boom.conflict('Workspace member ID does not exist or is not part of the workspace');

      const isMember = await this.models.ProjectMember.findOne({
        where: { projectId, workspaceMemberId },
        transaction
      });
      if(isMember) throw boom.conflict('Workspace member is already part of this project');

      const addedMember = await this.models.ProjectMember.create(
        { workspaceMemberId, role: 'member', propertyStatus: 'guest', projectId },
        { transaction }
      );

      await transaction.commit();

      await this.redisModels.ProjectMemberRedis.saveProjectMember(
        addedMember.projectId,
        workspaceMember.id
      );

      return addedMember.dataValues;
    } catch (error) {
      await transaction.rollback();
      throw boom.badRequest(error.message || 'Failed to add member to project');
    }
  }

  async changeRole(projectId, projectMemberId, newRole){
    try {
      const [updatedRows, [updatedProjectMember]] = await this.models.ProjectMember.update(
        { role: newRole },
        { where: { id: projectMemberId, projectId }, returning: true }
      );
      if(updatedRows === 0) throw boom.badRequest('Failed to update role');

      return updatedProjectMember.dataValues;
    } catch (error) {
      throw boom.badRequest(error.message || 'Failed to change role');
    }
  }

  async roleChangeController(projectId, projectMemberId, newRole){
    try {
      const memberStatus = await this.getProjectMemberById(projectId, projectMemberId);
      if(memberStatus.propertyStatus === 'owner') throw boom.forbidden("You cannot change the owner's role");
      if(memberStatus.role === newRole) throw boom.conflict('The member already has this role');

      const updatedMember = await this.changeRole(projectId, projectMemberId, newRole);
      return updatedMember;
    } catch (error) {
      throw boom.badRequest(error.message || 'Failed to change role');
    }
  }

  async getProjectMembers(projectId){
    try {
      const projectMembers = await this.models.ProjectMember.findAll(
        { where: { projectId } }
      );

      return projectMembers;
    } catch (error) {
      throw boom.badRequest(error.message || 'Failed to find project members');
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
      throw boom.badRequest(error.message || 'Failed to find project members');
    }
  }

  async getProjectMemberById(projectId, projectMemberId){
    try {
      const member = await this.models.ProjectMember.findOne({
        where: { id: projectMemberId, projectId },
      });

      return member.dataValues;
    } catch (error) {
      throw boom.badRequest(error.message || 'Failed to get project member status');
    }
  }
}

module.exports = ProjectMemberService;
