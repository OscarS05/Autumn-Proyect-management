'use strict';

const { WORKSPACE_MEMBER_TABLE } = require('../models/workspace-member.model');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn(WORKSPACE_MEMBER_TABLE, 'role', {
      allowNull: false,
      type: Sequelize.STRING,
      defaultValue: 'member'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn(WORKSPACE_MEMBER_TABLE, 'role', {
      allowNull: false,
      type: Sequelize.DataTypes.STRING,
      defaultValue: 'member',
      validate: {
        isIn: [['admin', 'member']],
      }
    });
  }
};
