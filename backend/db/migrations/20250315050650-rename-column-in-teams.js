'use strict';

const { TEAM_TABLE } = require('../models/team.model');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameColumn(TEAM_TABLE, 'owner_id', 'workspace_member_id');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.renameColumn(TEAM_TABLE, 'workspace_member_id', 'owner_id');
  }
};
