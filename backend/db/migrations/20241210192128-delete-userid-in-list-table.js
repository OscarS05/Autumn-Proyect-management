'use strict';

const { LIST_TABLE } = require("../models/list.model");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn(LIST_TABLE, 'user_id');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(LIST_TABLE, 'user_id', {
      field: 'user_id',
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: USER_TABLE,
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  },
};
