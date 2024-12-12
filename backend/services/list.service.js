const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { models } = require('../libs/sequelize');
const { config } = require('../config/config');
const UserService = require('../services/user.service');
const service = new UserService();

class ListService {
  constructor() {}

  async create(listName) {
    if (!listName) {
      throw boom.badRequest('Invalid data. Please try again.');
    }
    const listNameCreated = await models.List.create(listName);
    if(!listNameCreated){
      throw boom.internal('Failed to create the list. Please try again.');
    }
    return listNameCreated;
  }

  async update({listName, newName}) {
    if(!listName && !newName){
      throw boom.badRequest('Please, enter the new name')
    }
    const list = await this.findByName(listName);
    if (!list) {
      throw boom.notFound('List not found');
    }
    try {
      const rta = await list.update({ name: newName });
      return rta;
    } catch (error) {
      throw boom.badRequest('Failed to update list');
    }
  }

  async delete({ listName }){
    if(!listName){
      throw boom.badRequest('Please, try again');
    }
    try {
      const list = await this.findByName(listName);
      if(!list){
        throw boom.notFound('List not found to delete');
      }
      const rta = await list.destroy();
      return rta;
    } catch (error) {
      throw boom.internal('Internal error');
    }
  }

  async findByName(listName){
    console.log('THIS LISTNAME', listName);
    const list = await models.List.findOne({
      where: { name: listName },
    });
    return list;
  }

  async findAll(){
    const List = await models.List.findAll({
      include: ['card'],
    });
    return List.map(list => list.toJSON());
  }
}

module.exports = ListService;
