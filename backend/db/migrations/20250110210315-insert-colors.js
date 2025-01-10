'use strict';

const { COLOR_TABLE } = require("../models/color.model");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const colors = [
      { color: 'Green', rgb: '#28a745' }, // "Completed"
      { color: 'Gray', rgb: '#6c757d' }, // "Not Started"
      { color: 'Blue', rgb: '#007bff' }, // "In Progress"
      { color: 'Yellow', rgb: '#ffc107' }, // "Pending"
      { color: 'Red', rgb: '#dc3545' }, // "Blocked"
      { color: 'Orange', rgb: '#fd7e14' }, // "High Priority"
      { color: 'Purple', rgb: '#6f42c1' }, // "Review"
      { color: 'Teal', rgb: '#20c997' }, // "Low Priority"
      { color: 'Pink', rgb: '#e83e8c' }, // "Idea"
      { color: 'Light Blue', rgb: '#5bc0de' }, // "Waiting for Approval"
    ];

    await queryInterface.bulkInsert(COLOR_TABLE, colors, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete(COLOR_TABLE, null, {});
  }
};
