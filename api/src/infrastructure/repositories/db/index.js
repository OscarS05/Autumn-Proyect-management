const sequelize = require('../../store/db/sequelize');

const UserRepository = require('./user.repository');

const userRepository = new UserRepository(sequelize);

module.exports = {
  userRepository,
};
