const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const { models } = require('../libs/sequelize');

class UserService {
  constructor() {
  }

  async create(data) {
    const { password, confirmPassword } = data;
    if(password !== confirmPassword){
      throw boom.badRequest('Bad request');
    }
    const hash = await bcrypt.hash(password, 10);
    const newUser = await models.User.create({
      ...data,
      password: hash,
    });

    delete newUser.dataValues.password;
    return newUser;
  }
}

module.exports = UserService;
