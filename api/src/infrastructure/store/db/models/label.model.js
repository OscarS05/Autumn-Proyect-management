const { Model, DataTypes, Sequelize } = require('sequelize');
const { CARD_TABLE } = require('./card.model');
const { COLOR_TABLE } = require('./color.model');


const LABEL_TABLE = 'labels';

const LabelSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
    type: DataTypes.UUID
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  status: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  colorId: {
    field: 'color_id',
    allowNull: false,
    type: DataTypes.UUID,
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
    type: DataTypes.UUID,
    references: {
      model: CARD_TABLE,
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

class Label extends Model {
  static associate(models) {
    this.belongsTo(models.Card, { as: 'card' });

    this.hasOne(models.Color, { as: 'color' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: LABEL_TABLE,
      modelName: 'Label',
      timestamps: false
    }
  }
}


module.exports = { LABEL_TABLE, LabelSchema, Label }
