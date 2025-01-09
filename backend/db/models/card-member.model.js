const { Model, DataTypes, Sequelize } = require('sequelize');
const { TEAM_TABLE } = require('./team.model');
const { PROJECT_MEMBER_TABLE } = require('./project-member.model');
const { CARD_TABLE } = require('./card.model');

const CARD_MEMBER_TABLE = 'card_members';

const CardMemberSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  projectMemberId:{
    field: 'project_member_id',
    allowNull: true,
    type: DataTypes.INTEGER,
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
    type: DataTypes.INTEGER,
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
}

class CardMember extends Model {
  static associate(models) {

  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CARD_MEMBER_TABLE,
      modelName: 'CardMember',
      timestamps: false
    }
  }
}


module.exports = { CARD_MEMBER_TABLE, CardMemberSchema, CardMember };
