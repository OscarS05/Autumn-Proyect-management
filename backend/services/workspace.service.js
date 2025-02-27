const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { models } = require('../libs/sequelize');
const { config } = require('../config/config');

const Redis = require('./redis.service');
const redisService = new Redis();


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
    await redisService.saveWorkspaces(userId, [ workspace.dataValues ]);
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

    await redisService.updateWorkspace(updatedWorkspace.dataValues);

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
    await redisService.deleteWorkspace(userId, workspaceId);
    return response;
  }

  async findById(id){
    const workspace = await models.Workspace.findByPk(id);
    if(!workspace) throw boom.notFound('Workspace not found');

    return workspace;
  }

  async findAll(conditional){
    const Workspaces = await models.Workspace.findAll(conditional || {});
    if (!Workspaces || Workspaces.length === 0) {
      return [];
    }
    const listOfWorkspaces = Workspaces.map(Workspace => Workspace.dataValues);
    await redisService.saveWorkspaces(listOfWorkspaces[0].userId, listOfWorkspaces);
    return Workspaces.map(Workspace => Workspace);
  }

  async findWorkspacesAndProjects(userId){
    try {
      const Workspaces = await models.Workspace.findAll({
        where: { userId },
        include: [{ model: models.Project, as: 'project' }]
      });
      const listOfWorkspaces = Workspaces.map(Workspace => Workspace.dataValues);
      await redisService.saveWorkspaces(userId, listOfWorkspaces);
      return listOfWorkspaces;
    } catch (error) {
      return boom.internal('Error:', error);
    }
  }
}

module.exports = WorkspaceService;
