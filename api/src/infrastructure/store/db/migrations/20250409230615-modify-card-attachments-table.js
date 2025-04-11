'use strict';

const { CARD_ATTACHMENT_TABLE } = require('../models/card-attachment.model');
const { PROJECT_MEMBER_TABLE } = require('../models/project-member.model');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameColumn(CARD_ATTACHMENT_TABLE, 'name', 'filename');
    await queryInterface.renameColumn(CARD_ATTACHMENT_TABLE, 'attachmentUrl', 'url');
    await queryInterface.changeColumn(CARD_ATTACHMENT_TABLE, 'url', {
      type: Sequelize.TEXT,
      allowNull: false,
    });

    await queryInterface.addColumn(CARD_ATTACHMENT_TABLE, 'type', {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.removeColumn(CARD_ATTACHMENT_TABLE, 'project_member_id');

    await queryInterface.addColumn(CARD_ATTACHMENT_TABLE, 'created_at', {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    });

    await queryInterface.addColumn(CARD_ATTACHMENT_TABLE, 'public_id', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.renameColumn(CARD_ATTACHMENT_TABLE, 'filename', 'name');
    await queryInterface.renameColumn(CARD_ATTACHMENT_TABLE, 'url', 'attachmentUrl');
    await queryInterface.changeColumn(CARD_ATTACHMENT_TABLE, 'url', {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.removeColumn(CARD_ATTACHMENT_TABLE, 'type');

    await queryInterface.addColumn(CARD_ATTACHMENT_TABLE, 'project_member_id', {
      field: 'project_member_id',
      allowNull: false,
      type: Sequelize.UUID,
      references: {
        model: PROJECT_MEMBER_TABLE,
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });

    await queryInterface.removeColumn(CARD_ATTACHMENT_TABLE, 'created_at');
    await queryInterface.removeColumn(CARD_ATTACHMENT_TABLE, 'public_id');
  }
};
