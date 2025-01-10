'use strict';

const { USER_TABLE } = require("../models/user.model");
const { CARD_TABLE } = require("../models/card.model");
const { CARD_ATTACHMENT_TABLE } = require("../models/card-attachment.model");
const { CARD_MEMBER_TABLE } = require("../models/card-member.model");
const { CHECKLIST_TABLE } = require("../models/checklist.model");
const { ITEM_MEMBER_TABLE } = require("../models/item-members.model");
const { ITEM_TABLE } = require("../models/item.model");
const { PROJECT_MEMBER_TABLE } = require("../models/project-member.model");
const { PROJECT_TABLE } = require("../models/project.model");
const { TEAM_MEMBER_TABLE } = require("../models/team-member.model");
const { TEAM_TABLE } = require("../models/team.model");
const { WORKSPACE_MEMBER_TABLE } = require("../models/workspace-member.model");
const { WORKSPACE_TABLE } = require("../models/workspace.model");
const { LABEL_TABLE } = require("../models/label.model");
const { COLOR_TABLE } = require("../models/color.model");

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(WORKSPACE_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      description: {
        allowNull: true,
        type: Sequelize.DataTypes.STRING
      },
      userId:{
        field: 'user_id',
        allowNull: true,
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: USER_TABLE,
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW
      }
    });
    await queryInterface.createTable(PROJECT_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
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
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: WORKSPACE_TABLE,
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
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
        type: Sequelize.DataTypes.INTEGER
      },
      workspaceMemberId:{
        field: 'workspace_member_id',
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
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
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: WORKSPACE_MEMBER_TABLE,
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
      projectId:{
        field: 'project_id',
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: PROJECT_TABLE,
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
    await queryInterface.createTable(TEAM_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      ownerId:{
        field: 'owner_id',
        allowNull: true,
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: WORKSPACE_MEMBER_TABLE,
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW
      }
    });
    await queryInterface.createTable(TEAM_MEMBER_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
      },
      workspaceMemberId:{
        field: 'workspace_member_id',
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: WORKSPACE_MEMBER_TABLE,
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
        }
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
      teamId:{
        field: 'team_id',
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: TEAM_TABLE,
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
    await queryInterface.createTable(CARD_MEMBER_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
      },
      projectMemberId:{
        field: 'project_member_id',
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: PROJECT_MEMBER_TABLE,
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      cardId:{
        field: 'card_id',
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: CARD_TABLE,
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      teamId:{
        field: 'team_id',
        allowNull: true,
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: TEAM_TABLE,
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
    await queryInterface.createTable(CARD_ATTACHMENT_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      attachmentUrl: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING
      },
      cardId: {
        field: 'card_id',
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: CARD_TABLE,
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      updatedBy: {
        field: 'updated_by',
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: PROJECT_MEMBER_TABLE,
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }
    });
    await queryInterface.createTable(CHECKLIST_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      cardId: {
        field: 'card_id',
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: CARD_TABLE,
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW
      }
    });
    await queryInterface.createTable(ITEM_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      checklistId: {
        field: 'checklist_id',
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: CHECKLIST_TABLE,
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      status: {
        allowNull: false,
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: false,
      },
      startDate: {
        allowNull: true,
        type: Sequelize.DataTypes.DATE,
        field: 'start_date',
      },
      endDate: {
        allowNull: true,
        type: Sequelize.DataTypes.DATE,
        field: 'end_date',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW
      }
    });
    await queryInterface.createTable(ITEM_MEMBER_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
      },
      projectMemberId:{
        field: 'project_member_id',
        allowNull: true,
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: PROJECT_MEMBER_TABLE,
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      teamId:{
        field: 'team_id',
        allowNull: true,
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: TEAM_TABLE,
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      itemId:{
        field: 'item_id',
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: ITEM_TABLE,
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
    await queryInterface.createTable(COLOR_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
      },
      color: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      rgb: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
    });
    await queryInterface.createTable(LABEL_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      status: {
        allowNull: false,
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: false,
      },
      colorId: {
        field: 'color_id',
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: COLOR_TABLE,
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      cardId: {
        field: 'card_id',
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: CARD_TABLE,
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        field: 'created_at',
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
    await queryInterface.dropTable(CARD_MEMBER_TABLE);
    await queryInterface.dropTable(CARD_ATTACHMENT_TABLE);
    await queryInterface.dropTable(CHECKLIST_TABLE);
    await queryInterface.dropTable(ITEM_TABLE);
    await queryInterface.dropTable(ITEM_MEMBER_TABLE);
    await queryInterface.dropTable(COLOR_TABLE);
    await queryInterface.dropTable(LABEL_TABLE);
  }
};
