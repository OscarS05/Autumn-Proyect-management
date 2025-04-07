'use strict';

const { COLOR_TABLE } = require('../models/color.model');
const { LABEL_TABLE } = require('../models/label.model');
const { PROJECT_TABLE } = require('../models/project.model');
const { CARD_TABLE } = require('../models/card.model');

module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.removeColumn(LABEL_TABLE, 'created_at');
    await queryInterface.removeColumn(LABEL_TABLE, 'status');
    await queryInterface.removeColumn(LABEL_TABLE, 'color_id');

    await queryInterface.addColumn(LABEL_TABLE, 'color', {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.removeColumn(LABEL_TABLE, 'card_id');
    await queryInterface.addColumn(LABEL_TABLE, 'project_id', {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: PROJECT_TABLE,
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
    await queryInterface.dropTable(COLOR_TABLE);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn(LABEL_TABLE, 'created_at', {
      allowNull: false,
      type: Sequelize.DATE,
      field: 'created_at',
      defaultValue: Sequelize.NOW
    });

    await queryInterface.addColumn(LABEL_TABLE, 'status', {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    });

    await queryInterface.addColumn(LABEL_TABLE, 'color_id', {
      field: 'color_id',
      allowNull: false,
      type: DataTypes.UUID,
      references: {
        model: COLOR_TABLE,
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });

    await queryInterface.removeColumn(LABEL_TABLE, 'color');

    await queryInterface.addColumn(LABEL_TABLE, 'card_id', {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: CARD_TABLE,
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });

    await queryInterface.removeColumn(LABEL_TABLE, 'project_id');

    await queryInterface.createTable(COLOR_TABLE, {
      id: {
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        type: Sequelize.UUID
      },
      color: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      rgb: {
        allowNull: false,
        type: Sequelize.STRING,
      },
    });
  }
};
