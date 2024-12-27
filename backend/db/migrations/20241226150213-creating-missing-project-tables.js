'use strict';

const { PROJECT_MEMBER_TABLE } = require("../models/project-member.model");
const { PROJECT_TABLE } = require("../models/project.model");
const { TEAM_MEMBER_TABLE } = require("../models/team-member.model");
const { TEAM_TABLE } = require("../models/team.model");
const { WORKSPACE_MEMBER_TABLE } = require("../models/workspace-member.model");
const { WORKSPACE_TABLE } = require("../models/workspace.model");

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(WORKSPACE_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      description: {
        allowNull: true,
        type: Sequelize.DataTypes.STRING
      },
      userId:{
        field: 'user_id',
        allowNull: true,
        type: DataTypes.INTEGER,
        references: {
          model: USER_TABLE,
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW
      }
    });
    await queryInterface.createTable(PROJECT_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      visibility: {
        allowNull: false,
        defaultValue: 'public',
        type: Sequelize.DataTypes.STRING,
        validate: {
          isIn: [['public', 'workspace']],
        },
      },
      workspaceId:{
        field: 'workspace_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: WORKSPACE_TABLE,
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW
      }
    });
    await queryInterface.createTable(WORKSPACE_MEMBER_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
      },
      userId:{
        field: 'user_id',
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: USER_TABLE,
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      role: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
        defaultValue: 'member',
        validate: {
          isIn: [['admin', 'member']],
        },
      },
      workspaceId:{
        field: 'workspace_id',
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: WORKSPACE_TABLE,
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      addedAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        field: 'added_at',
        defaultValue: Sequelize.NOW
      }
    });
    await queryInterface.createTable(PROJECT_MEMBER_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      workspaceMemberId:{
        field: 'workspace_member_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: WORKSPACE_MEMBER_TABLE,
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      teamId:{
        field: 'team_id',
        allowNull: true,
        type: DataTypes.INTEGER,
        references: {
          model: WORKSPACE_MEMBER_TABLE,
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      role: {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: 'member',
        validate: {
          isIn: [['admin', 'member']],
        },
      },
      projectId:{
        field: 'project_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: PROJECT_TABLE,
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      addedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'added_at',
        defaultValue: Sequelize.NOW
      }
    });
    await queryInterface.createTable(TEAM_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      ownerId:{
        field: 'owner_id',
        allowNull: true,
        type: DataTypes.INTEGER,
        references: {
          model: WORKSPACE_MEMBER_TABLE,
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW
      }
    });
    await queryInterface.createTable(TEAM_MEMBER_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      workspaceMemberId:{
        field: 'workspace_member_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: WORKSPACE_MEMBER_TABLE,
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      role: {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: 'member',
        validate: {
          isIn: [['admin', 'member']],
        }
      },
      workspaceId:{
        field: 'workspace_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: WORKSPACE_TABLE,
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      teamId:{
        field: 'team_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: TEAM_TABLE,
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      addedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'added_at',
        defaultValue: Sequelize.NOW
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(WORKSPACE_TABLE);
    await queryInterface.dropTable(PROJECT_TABLE);
    await queryInterface.dropTable(WORKSPACE_MEMBER_TABLE);
    await queryInterface.dropTable(PROJECT_MEMBER_TABLE);
    await queryInterface.dropTable(TEAM_TABLE);
    await queryInterface.dropTable(TEAM_MEMBER_TABLE);
  }
};
