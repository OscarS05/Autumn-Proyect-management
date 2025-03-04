'use strict';

const { PROJECT_TABLE } = require('../models/project.model');
const { WORKSPACE_MEMBER_TABLE } = require('../models/workspace-member.model');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(PROJECT_TABLE, 'workspace_member_id', {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: WORKSPACE_MEMBER_TABLE,
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(PROJECT_TABLE, 'workspace_member_id');
  }
};
