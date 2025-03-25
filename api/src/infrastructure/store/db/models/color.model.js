const { Model, DataTypes, Sequelize } = require('sequelize');
const { CARD_TABLE } = require('./card.model');


const COLOR_TABLE = 'colors';

const ColorSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
    type: DataTypes.UUID
  },
  color: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  rgb: {
    allowNull: false,
    type: DataTypes.STRING,
  },
}

class Color extends Model {
  static associate(models) {
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: COLOR_TABLE,
      modelName: 'Color',
      timestamps: false
    }
  }
}


module.exports = { COLOR_TABLE, ColorSchema, Color }
