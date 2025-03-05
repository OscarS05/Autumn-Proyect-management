'use strict';

const { WORKSPACE_MEMBER_TABLE } = require('../models/workspace-member.model');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(WORKSPACE_MEMBER_TABLE, 'property_status', {
      allowNull: false,
      type: Sequelize.STRING,
      defaultValue: 'guest',
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(WORKSPACE_MEMBER_TABLE, 'property_status');
  }
};
