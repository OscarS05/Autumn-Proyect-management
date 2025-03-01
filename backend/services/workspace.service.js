const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

const { WorkspaceRedis } = require('./redis/index');


class WorkspaceService {
  constructor() {}

  async create({ name, description, userId }) {
    if (!name || !description || !userId) {
      return boom.badRequest('Please, try again');
    }
    const workspace = await models.Workspace.create({ name: name, description: description, userId: userId });
    if(!workspace){
      return boom.badRequest('Failed to create card');
    }
    await WorkspaceRedis.saveWorkspaces(userId, [ workspace.dataValues ]);
    return workspace;
  }

  async update(id, data) {
    const allowedFields = ["name", "description"];

    const changes = Object.keys(data)
    .filter(key => allowedFields.includes(key))
    .reduce((obj, key) => {
      obj[key] = data[key];
      return obj;
    }, {});

    if(Object.keys(changes).length === 0){
      throw boom.badRequest('Please, try again');
    }

    const [updatedRows, [updatedWorkspace]] = await models.Workspace.update(changes, {
      where: { id },
      returning: true,
    });

    await WorkspaceRedis.updateWorkspace(updatedWorkspace.dataValues);

    if(!updatedRows) return boom.notFound('Workspace not found');
    return updatedWorkspace;
  }

  async delete(userId, workspaceId){
    if(!workspaceId){
      return boom.badRequest('Please, try again');
    }

    const response = await models.Workspace.destroy({
      where: { id: workspaceId }
    });
    await WorkspaceRedis.deleteWorkspace(userId, workspaceId);
    return response;
  }

  async findById(id){
    const workspace = await models.Workspace.findByPk(id);
    if(!workspace) throw boom.notFound('Workspace not found');

    return workspace;
  }

  async findAll(workspaceId){
    try {
      const Workspaces = await models.Workspace.findAll({
        where: { id: workspaceId },
        include: [{ model: models.Project, as: 'project' }]
      });
      const workspace = Workspaces.map(Workspace => Workspace.dataValues);
      await WorkspaceRedis.saveWorkspaces(workspaceId, workspace);
      return workspace;
    } catch (error) {
      return boom.internal('Error:', error);
    }
  }

  async findWorkspacesAndProjects(userId){
    try {
      const Workspaces = await models.Workspace.findAll({
        where: { userId },
        include: [{ model: models.Project, as: 'project' }]
      });
      const listOfWorkspaces = Workspaces.map(Workspace => Workspace.dataValues);
      await WorkspaceRedis.saveWorkspaces(userId, listOfWorkspaces);
      return listOfWorkspaces;
    } catch (error) {
      return boom.internal('Error:', error);
    }
  }
}

module.exports = WorkspaceService;
