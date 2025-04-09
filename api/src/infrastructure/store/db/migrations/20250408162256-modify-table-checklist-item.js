'use strict';

const { CHECKLIST_ITEM_TABLE } = require('../models/checklist-item.model');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameColumn(CHECKLIST_ITEM_TABLE, 'status', 'is_checked');
    await queryInterface.renameColumn(CHECKLIST_ITEM_TABLE, 'end_date', 'due_date');
    await queryInterface.removeColumn(CHECKLIST_ITEM_TABLE, 'start_date');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn(CHECKLIST_ITEM_TABLE, 'start_date', {
      allowNull: true,
      type: Sequelize.DATE,
    });
    await queryInterface.renameColumn(CHECKLIST_ITEM_TABLE, 'is_checked', 'status');
    await queryInterface.renameColumn(CHECKLIST_ITEM_TABLE, 'due_date', 'end_date');
  }
};
