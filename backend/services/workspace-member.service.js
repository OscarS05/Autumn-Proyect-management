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
}

module.exports = WorkspaceMemberService;
