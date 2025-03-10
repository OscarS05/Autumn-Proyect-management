const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

class UserService {
  constructor(sequelize, models) {
    this.sequelize = sequelize;
    this.models = models;
  }

  async create(data) {
    const { password, confirmPassword } = data;
    if (password !== confirmPassword) {
      throw boom.badRequest('Passwords do not match');
    }
    const hash = await bcrypt.hash(password, 10);
    const newUser = await this.models.User.create({
      ...data,
      password: hash,
    });
    delete newUser.dataValues.password;
    return newUser;
  }

  async update(id, changes) {
    const user = await this.findOne(id);
    if (!user) {
      throw boom.notFound('User not found');
    }
    try {
      const rta = await user.update(changes);
      return rta;
    } catch (error) {
      throw boom.badRequest('Failed to update user');
    }
  }

  async delete(id){
    try {
      const user = await this.findOne(id);
      if(!user){
        throw boom.notFound('User not found to delete');
      }
      const rta = await user.destroy();
      return rta;
    } catch (error) {
      throw boom.internal('Internal error');
    }
  }

  async findByEmail(email){
    const rta = await this.models.User.findOne({
      where: { email },
    });
    return rta;
  }

  async findOne(id){
    const user = await this.models.User.findByPk(id);
    if(!user){
      throw boom.notFound('User not found');
    }
    return user;
  }

  async findAll(conditional){
    const users = await this.models.User.findAll(conditional || {});
    return users.map(user => {
      if (user.dataValues) {
        delete user.dataValues.recoveryToken;
        delete user.dataValues.password;
      }
      return user;
    });
  }
}

module.exports = UserService;
