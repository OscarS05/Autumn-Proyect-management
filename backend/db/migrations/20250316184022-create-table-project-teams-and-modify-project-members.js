'use strict';

const { PROJECT_MEMBER_TABLE } = require("../models/project-member.model");
const { PROJECT_TEAM_TABLE } = require("../models/project-team.model");
const { PROJECT_TABLE } = require("../models/project.model");
const { TEAM_TABLE } = require("../models/team.model");



module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(PROJECT_TEAM_TABLE, {
      teamId:{
        field: 'team_id',
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: TEAM_TABLE,
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      projectId:{
        field: 'project_id',
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: PROJECT_TABLE,
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW
      }
    });

    await queryInterface.removeColumn(PROJECT_MEMBER_TABLE, 'team_id');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(PROJECT_TEAM_TABLE);

    await queryInterface.addColumn(PROJECT_MEMBER_TABLE, 'team_id', {
      field: 'team_id',
      allowNull: true,
      type: Sequelize.INTEGER,
      references: {
        model: TEAM_TABLE,
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  }
};
