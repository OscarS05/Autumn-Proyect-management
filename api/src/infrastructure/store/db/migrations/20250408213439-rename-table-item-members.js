'use strict';

const { CHECKLIST_ITEM_TABLE } = require('../models/checklist-item.model');
const { CHECKLIST_ITEM_MEMBER_TABLE } = require('../models/checklist-item-members.model');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameTable('item_members', CHECKLIST_ITEM_MEMBER_TABLE);

    await queryInterface.removeColumn(CHECKLIST_ITEM_MEMBER_TABLE, 'item_id');
    await queryInterface.addColumn(CHECKLIST_ITEM_MEMBER_TABLE, 'checklist_item_id', {
      allowNull: false,
      type: Sequelize.UUID,
      references: {
        model: CHECKLIST_ITEM_TABLE,
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.renameTable(CHECKLIST_ITEM_MEMBER_TABLE, 'item_members');
    await queryInterface.addColumn(CHECKLIST_ITEM_MEMBER_TABLE, 'item_id', {
      allowNull: false,
      type: Sequelize.UUID,
      references: {
        model: 'checklist_items',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    await queryInterface.removeColumn(CHECKLIST_ITEM_MEMBER_TABLE, 'checklist_item_id');
  }
};
