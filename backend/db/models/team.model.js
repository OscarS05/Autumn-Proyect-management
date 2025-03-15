const { Model, DataTypes, Sequelize } = require('sequelize');
const { WORKSPACE_MEMBER_TABLE } = require('./workspace-member.model');
const { WORKSPACE_TABLE } = require('./workspace.model');


const TEAM_TABLE = 'teams';

const TeamSchema = {
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
  workspaceMemberId:{
    field: 'workspace_member_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: WORKSPACE_MEMBER_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT'
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
}

class Team extends Model {
  static associate(models) {
    this.belongsToMany(models.WorkspaceMember, {
      through: models.TeamMember,
      foreignKey: 'teamId',
      as: 'members',
    });

    this.belongsTo(models.Workspace, {
      foreignKey: 'workspaceId',
      as: 'workspace'
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: TEAM_TABLE,
      modelName: 'Team',
      timestamps: false
    }
  }
}


module.exports = { TEAM_TABLE, TeamSchema, Team };
