'use strict';

const { CARD_LABELS_TABLE } = require('../models/card-labels.model');
const { CARD_TABLE } = require('../models/card.model');
const { LABEL_TABLE } = require('../models/label.model');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(CARD_LABELS_TABLE, {
      cardId: {
        field: 'card_id',
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        references: {
          model: CARD_TABLE,
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      labelId: {
        field: 'label_id',
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        references: {
          model: LABEL_TABLE,
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      isVisible: {
        field: 'is_visible',
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(CARD_LABELS_TABLE);
  }
};
