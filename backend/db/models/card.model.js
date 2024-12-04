const { Model, DataTypes, Sequelize } = require('sequelize');
const { LIST_TABLE } = require('./list.model');


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
