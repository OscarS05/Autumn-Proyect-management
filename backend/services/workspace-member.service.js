// Cuando un usuario entra a un workspace como invitado, es decir, se crea una fila en la tabla workspaceMember
// Entonces se hace una consulta a redis para guardar los ids de los workspaces donde el usuario es un guest
// Pero estos ids guardarlos en una clave diferente donde especifique que son los wkpcs donde este es un guest

const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class WorkspaceMemberService {
  constructor(){}

  async create(workspaceId){
    try {


    } catch (error) {
      console.error('Error:', error);
      throw boom.badRequest('Failed to create workspace memebrs');
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
