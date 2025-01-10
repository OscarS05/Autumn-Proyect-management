const { Model, DataTypes, Sequelize } = require('sequelize');
const { TEAM_TABLE } = require('./team.model');
const { PROJECT_MEMBER_TABLE } = require('./project-member.model');
const { ITEM_TABLE } = require('./item.model');

const ITEM_MEMBER_TABLE = 'item_members';

const ItemMemberSchema = {
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
  itemId:{
    field: 'item_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: ITEM_TABLE,
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

class ItemMember extends Model {
  static associate(models) {

  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ITEM_MEMBER_TABLE,
      modelName: 'ItemMember',
      timestamps: false
    }
  }
}


module.exports = { ITEM_MEMBER_TABLE, ItemMemberSchema, ItemMember };
