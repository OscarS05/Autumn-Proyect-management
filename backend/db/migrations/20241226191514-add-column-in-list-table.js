'use strict';

const { LIST_TABLE } = require("../models/list.model");
const { PROJECT_TABLE } = require("../models/project.model");

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(LIST_TABLE, 'project_id', {
      allowNull: false,
      type: Sequelize.DataTypes.INTEGER,
      references: {
        model: PROJECT_TABLE,
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(LIST_TABLE, 'project_id');
  }
};
