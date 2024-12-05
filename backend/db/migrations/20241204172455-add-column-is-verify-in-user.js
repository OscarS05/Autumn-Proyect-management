'use strict';

const { USER_TABLE } = require('../models/user.model');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(USER_TABLE, 'is_verified', {
      allowNull: false,
      type: Sequelize.DataTypes.BOOLEAN,
      field: 'is_verified',
      defaultValue: false,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(USER_TABLE, 'is_verified');
  }
};
