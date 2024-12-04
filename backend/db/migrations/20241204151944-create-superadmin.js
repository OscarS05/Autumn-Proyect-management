'use strict';

const { USER_TABLE } = require('../models/user.model');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(USER_TABLE, [
      {
        name: 'Super Admin',
        email: 'santiagoscar2@gmail.com',
        password: 'hashed_password_here',
        role: 'superadmin',
        created_at: new Date()
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete(USER_TABLE, { email: 'santiagoscar2@gmail.com' }, {});
  }
};
