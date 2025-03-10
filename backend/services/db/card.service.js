const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { models } = require('../../libs/sequelize');
const { config } = require('../../config/config');

class CardService {
  constructor() {}

  async create({ cardName, listId }) {
    if (!cardName && listId) {
      throw boom.badRequest('Invalid data. Please give it a name.');
    }
    const cardNameCreated = await models.Card.create({ name: cardName, listId: listId });
    if(!cardNameCreated){
      throw boom.internal('Failed to create the list. Please try again.');
    }
    return cardNameCreated;
  }

  async update({cardName, newName}) {
    if(!cardName && !newName){
      throw boom.badRequest('Please, enter the new name')
    }
    const card = await this.findByName(cardName);
    if (!card) {
      throw boom.notFound('Card not found');
    }
    try {
      const rta = await card.update({ name: newName });
      return rta;
    } catch (error) {
      throw boom.badRequest('Failed to update card');
    }
  }

  async delete({ cardName, listId }){
    if(!cardName && !listId){
      throw boom.badRequest('Please, try again');
    }
    try {
      const card = await this.findByName(cardName);
      if(!card){
        throw boom.notFound('Card not found to delete');
      }
      const rta = await card.destroy();
      return rta;
    } catch (error) {
      throw boom.internal('Internal error');
    }
  }

  async findByName(cardName){
    const card = await models.Card.findOne({
      where: { name: cardName },
    });
    return card;
  }

  async findByListId(listId){
    const card = await models.Card.findAll({
      where: { listId: listId },
    });
    return card;
  }

  async findAll(conditional){
    const Cards = await models.Card.findAll(conditional || {});
    return Cards.map(card => card);
  }
}

module.exports = CardService;
