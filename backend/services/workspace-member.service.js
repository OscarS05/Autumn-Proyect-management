// Cuando un usuario entra a un workspace como invitado, es decir, se crea una fila en la tabla workspaceMember Entonces se hace una
// consulta a redis para guardar los ids de los workspaces donde el usuario es un guest

const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

const { WorkspaceMemberRedis } = require('./redis/index');

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
      const memberStatus = await this.findStatusById(workspaceId, workspaceMemberId);
      if(memberStatus.property_status === 'owner') throw boom.forbidden("You cannot change the owner's role");
      if(memberStatus.role === newRole) throw boom.conflict('The member already has this role');

      const [ updatedRows, [updatedWorkspaceMember] ] = await models.WorkspaceMember.update(
        { role: newRole },
        { where: { workspaceId, userId: workspaceMemberId }, returning: true }
      );
      if(updatedRows === 0) throw boom.badRequest('Failed to update role');

      return updatedWorkspaceMember.dataValues;
    } catch (error) {
      console.error('Error:', error);
      throw boom.badRequest(error.message || 'Failed to update role');
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

  async findStatusById(workspaceId, userId){
    try {
      const status = await models.WorkspaceMember.findOne({
        where: { workspaceId, userId },
        attributes: ['role', 'property_status'],
      });
      if(!status) throw boom.notFound('Workspace member or workspace not found');

      return status.dataValues;
    } catch (error) {
      console.error('Error:', error);
      throw boom.badRequest(error.message || 'Failed to find role');
    }
  }
}

module.exports = WorkspaceMemberService;
