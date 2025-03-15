'use strict';

const { TEAM_TABLE } = require('../models/team.model');
const { WORKSPACE_MEMBER_TABLE } = require('../models/workspace-member.model');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn(TEAM_TABLE, 'workspace_member_id', {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: WORKSPACE_MEMBER_TABLE,
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn(TEAM_TABLE, 'workspace_member_id', {
      allowNull: true,
      type: Sequelize.INTEGER,
      references: {
        model: WORKSPACE_MEMBER_TABLE,
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
  }
};
