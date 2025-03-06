const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

const { WorkspaceMemberRedis } = require('./redis/index');
const sequelize = require('../libs/sequelize');

class WorkspaceMemberService {
  constructor(){}

  async create(workspaceId, userId){
    try {
      const isMember = await models.WorkspaceMember.findOne(
        { where: { workspaceId, userId } }
      );
      if(isMember){
        throw boom.conflict('User is already a member of this workspace');
      }

      const addedMember = await models.WorkspaceMember.create({
        workspaceId,
        userId,
        role: 'member',
        propertyStatus: 'guest'
      });

      await WorkspaceMemberRedis.saveWorkspaceIdByUserId(userId, workspaceId);
      return addedMember;
    } catch (error) {
      console.error('Error:', error);
      throw boom.badRequest(error.message || 'Failed to create workspace memebrs');
    }
  }

  async updateRole(workspaceId, workspaceMemberId, newRole){
    try {
      const memberStatus = await this.findStatusByMemberId(workspaceId, workspaceMemberId);
      if(memberStatus.property_status === 'owner') throw boom.forbidden("You cannot change the owner's role");
      if(memberStatus.role === newRole) throw boom.conflict('The member already has this role');

      const [ updatedRows, [updatedWorkspaceMember] ] = await models.WorkspaceMember.update(
        { role: newRole },
        { where: { workspaceId, id: workspaceMemberId }, returning: true }
      );
      if(updatedRows === 0) throw boom.badRequest('Failed to update role');

      return updatedWorkspaceMember.dataValues;
    } catch (error) {
      console.error('Error:', error);
      throw boom.badRequest(error.message || 'Failed to update role');
    }
  }

  async removeMember(workspaceId, workspaceMemberId, requesterStatus){
    const transaction = await sequelize.transaction();
    try {
      const memberStatus = await this.findStatusByMemberId(workspaceId, workspaceMemberId);
      if(memberStatus.property_status === 'owner') throw boom.forbidden("You cannot remove the owner");
      if(memberStatus.role === 'admin' && requesterStatus.property_status === 'guest') throw boom.forbidden("You cannot remove an administrator");
      if(memberStatus.userId === requesterStatus.userId) throw boom.forbidden("You cannot remove yourself");

      const removedMember = await models.WorkspaceMember.destroy(
        { where: { workspaceId, id: workspaceMemberId }, transaction }
      );
      if(removedMember === 0) throw boom.badRequest('Member not found or already removed');

      await transaction.commit()
      await WorkspaceMemberRedis.deleteMember(memberStatus.userId, workspaceId);
      return removedMember;
    } catch (error) {
      await transaction.rollback();
      throw boom.badRequest(error.message || 'Failed to remove member');
    }
  }

  async findAll(workspaceId){
    try {
      const workspaceMembers = await models.WorkspaceMember.findAll({
        where: { workspaceId },
        include: [
          { model: models.User, as:'user', attributes: ['id', 'name'] },
          { model: models.Team, as: 'teams', through: { attributes: [] } },
          { model: models.Project, as: 'projects', through: { attributes: [] } }
        ]
      });
      return workspaceMembers;
    } catch (error) {
      console.error('Error:', error);
      throw boom.badRequest('Failed to find workspace memebrs');
    }
  }

  async findStatusByMemberId(workspaceId, workspaceMemberId){
    try {
      const status = await models.WorkspaceMember.findOne({
        where: { workspaceId, id: workspaceMemberId },
        attributes: ['role', 'property_status', 'userId'],
      });
      if(!status) throw boom.notFound('Workspace member or workspace not found');

      return status.dataValues;
    } catch (error) {
      console.error('Error:', error);
      throw boom.badRequest(error.message || 'Failed to find role');
    }
  }

  async findStatusByUserId(workspaceId, userId){
    try {
      const status = await models.WorkspaceMember.findOne({
        where: { workspaceId, userId },
        attributes: ['role', 'property_status', 'userId'],
      });
      if(!status) throw boom.notFound('Workspace member or workspace not found');

      return status.dataValues;
    } catch (error) {
      throw boom.badRequest(error.message || 'Failed to find role');
    }
  }
}

module.exports = WorkspaceMemberService;
