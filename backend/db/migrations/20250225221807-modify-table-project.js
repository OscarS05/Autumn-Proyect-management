'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('projects', 'visibility', {
      allowNull: false,
      type: Sequelize.DataTypes.STRING,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('projects', 'visibility', {
      allowNull: false,
      defaultValue: 'public',
      type: Sequelize.DataTypes.STRING,
      validate: {
        isIn: [['public', 'workspace']],
      },
    });
  }
};
