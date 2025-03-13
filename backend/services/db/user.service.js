const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

class UserService {
  constructor(sequelize, models) {
    this.sequelize = sequelize;
    this.models = models;
  }

  async create(data) {
    try {
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
    } catch (error) {
      throw boom.badRequest(error.message || 'Failed to create user');
    }
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
    try {
      const rta = await this.models.User.findOne({
        where: { email },
      });
      return rta;
    } catch (error) {
      throw boom.badRequest(error.message || 'Failed to find user by email');
    }
  }

  async findOne(id){
    try {
      const user = await this.models.User.findByPk(id);
      if(!user){
        throw boom.notFound('User not found');
      }
      return user;
    } catch (error) {
      throw boom.badRequest(error.message || 'Failed to find user');
    }
  }

  async findAll(conditional){
    try {
      const users = await this.models.User.findAll(conditional || {});
      return users.map(user => {
        if (user.dataValues) {
          delete user.dataValues.recoveryToken;
          delete user.dataValues.password;
        }
        return user;
      });
    } catch (error) {
      throw boom.badRequest(error.message || 'Failed to find all users');
    }
  }
}

module.exports = UserService;
