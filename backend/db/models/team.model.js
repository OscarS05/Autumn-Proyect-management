const { Model, DataTypes, Sequelize } = require('sequelize');
const { WORKSPACE_MEMBER_TABLE } = require('./workspace-member.model');


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
}

class Team extends Model {
  static associate(models) {
    this.belongsToMany(models.WorkspaceMember, {
      through: models.TeamMember,
      foreignKey: 'teamId',
      as: 'members',
    });s
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
