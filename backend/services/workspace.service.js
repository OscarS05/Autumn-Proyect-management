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

  // async update({cardName, newName}) {
  //   if(!cardName && !newName){
  //     throw boom.badRequest('Please, enter the new name')
  //   }
  //   const card = await this.findByName(cardName);
  //   if (!card) {
  //     throw boom.notFound('Card not found');
  //   }
  //   try {
  //     const rta = await card.update({ name: newName });
  //     return rta;
  //   } catch (error) {
  //     throw boom.badRequest('Failed to update card');
  //   }
  // }

  // async delete({ cardName, listId }){
  //   if(!cardName && !listId){
  //     throw boom.badRequest('Please, try again');
  //   }
  //   try {
  //     const card = await this.findByName(cardName);
  //     if(!card){
  //       throw boom.notFound('Card not found to delete');
  //     }
  //     const rta = await card.destroy();
  //     return rta;
  //   } catch (error) {
  //     throw boom.internal('Internal error');
  //   }
  // }

  // async findByName(cardName){
  //   const card = await models.Card.findOne({
  //     where: { name: cardName },
  //   });
  //   return card;
  // }

  // async findByListId(listId){
  //   const card = await models.Card.findAll({
  //     where: { listId: listId },
  //   });
  //   return card;
  // }

  async findAll(conditional){
    const Workspaces = await models.Workspace.findAll(conditional || {});
    if (!Workspaces || Workspaces.length === 0) {
      return [];
    }
    const listOfWorkspaces = Workspaces.map(Workspace => Workspace.dataValues);
    await redisService.saveWorkspaces(listOfWorkspaces.userId, listOfWorkspaces);
    return Workspaces.map(Workspace => Workspace);
  }
}

module.exports = WorkspaceService;
