const { Model, DataTypes, Sequelize } = require('sequelize');
const { LIST_TABLE } = require('./list.model');
const { allow } = require('joi');


const CARD_TABLE = 'cards';

const CardSchema = {
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
    type: DataTypes.STRING
  },
  listId: {
    field: 'list_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: LIST_TABLE,
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

class Card extends Model {
  static associate(models) {
    this.belongsTo(models.List, { as: 'list' });

    this.belongsToMany(models.ProjectMember, {
      through: models.CardMember,
      foreignKey: 'cardId',
      as: 'members',
    });

    this.hasMany(models.CardAttachment, {
      foreignKey: 'cardId',
      as: 'attachments'
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CARD_TABLE,
      modelName: 'Card',
      timestamps: false
    }
  }
}


module.exports = { CARD_TABLE, CardSchema, Card }
