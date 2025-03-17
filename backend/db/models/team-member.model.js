const { Model, DataTypes, Sequelize } = require('sequelize');
const { WORKSPACE_MEMBER_TABLE } = require('./workspace-member.model');
const { TEAM_TABLE } = require('./team.model');
const { WORKSPACE_TABLE } = require('./workspace.model');

const TEAM_MEMBER_TABLE = 'team_members';

const TeamMemberSchema = {
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
  propertyStatus: {
    field: 'property_status',
    allowNull: false,
    type: Sequelize.STRING,
    defaultValue: 'guest',
  },
  addedAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'added_at',
    defaultValue: Sequelize.NOW
  }
}

class TeamMember extends Model {
  static associate(models) {
    this.belongsTo(models.WorkspaceMember, {
      foreignKey: 'workspaceMemberId',
      as: 'workspaceMember'
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: TEAM_MEMBER_TABLE,
      modelName: 'TeamMember',
      timestamps: false
    }
  }
}


module.exports = { TEAM_MEMBER_TABLE, TeamMemberSchema, TeamMember };
