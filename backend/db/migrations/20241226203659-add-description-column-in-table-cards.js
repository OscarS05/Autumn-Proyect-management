'use strict';

const { CARD_TABLE } = require("../models/card.model");

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(CARD_TABLE, 'description', {
      description: {
        allowNull: true,
        type: DataTypes.STRING
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(CARD_TABLE, 'description')
  }
};
