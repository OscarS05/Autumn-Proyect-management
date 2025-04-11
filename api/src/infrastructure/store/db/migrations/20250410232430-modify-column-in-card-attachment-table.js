'use strict';

const { CARD_ATTACHMENT_TABLE } = require('../models/card-attachment.model');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn(CARD_ATTACHMENT_TABLE, 'public_id', {
      allowNull: true,
      type: Sequelize.STRING
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn(CARD_ATTACHMENT_TABLE, 'public_id', {
      allowNull: false,
      type: Sequelize.STRING
    });
  }
};
