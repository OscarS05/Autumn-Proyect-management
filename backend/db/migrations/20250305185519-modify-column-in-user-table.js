'use strict';

const { USER_TABLE } = require("../models/user.model");



module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn(USER_TABLE, 'role', {
      allowNull: false,
      type: Sequelize.STRING,
      defaultValue: 'basic'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn(USER_TABLE, 'role', {
      allowNull: false,
      type: Sequelize.STRING,
      defaultValue: 'member'
    });
  }
};
