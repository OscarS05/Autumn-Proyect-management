'use strict';

const { TEAM_TABLE } = require('../models/team.model');
const { WORKSPACE_TABLE } = require('../models/workspace.model');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(TEAM_TABLE, 'workspace_id', {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: WORKSPACE_TABLE,
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(TEAM_TABLE, 'workspace_id');
  }
};
