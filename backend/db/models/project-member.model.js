const { Model, DataTypes, Sequelize } = require('sequelize');
const { PROJECT_TABLE } = require('./project.model');
const { WORKSPACE_MEMBER_TABLE } = require('./workspace-member.model');

const PROJECT_MEMBER_TABLE = 'project_members';

const ProjectMemberSchema = {
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
}

class ProjectMember extends Model {
  static associate(models) {
    this.belongsToMany(models.Card, {
      through: models.CardMember,
      foreignKey: 'projectMemberId',
      as: 'cards',
    });

    this.belongsToMany(models.Item, {
      through: models.ItemMember,
      foreignKey: 'projectMemberId',
      as: 'items',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PROJECT_MEMBER_TABLE,
      modelName: 'ProjectMember',
      timestamps: false
    }
  }
}


module.exports = { PROJECT_MEMBER_TABLE, ProjectMemberSchema, ProjectMember };
