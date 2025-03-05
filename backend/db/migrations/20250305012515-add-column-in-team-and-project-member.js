'use strict';

const { PROJECT_MEMBER_TABLE } = require("../models/project-member.model");
const { TEAM_MEMBER_TABLE } = require("../models/team-member.model");



module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(PROJECT_MEMBER_TABLE, 'property_status', {
      allowNull: false,
      type: Sequelize.STRING,
      defaultValue: 'guest',
    });
    await queryInterface.addColumn(TEAM_MEMBER_TABLE, 'property_status', {
      allowNull: false,
      type: Sequelize.STRING,
      defaultValue: 'guest',
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(PROJECT_MEMBER_TABLE, 'property_status');
    await queryInterface.removeColumn(TEAM_MEMBER_TABLE, 'property_status');
  }
};
