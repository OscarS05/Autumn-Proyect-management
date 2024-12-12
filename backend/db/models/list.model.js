const { Model, DataTypes, Sequelize } = require('sequelize');
const { USER_TABLE } = require('./user.model');


const LIST_TABLE = 'lists';

const ListSchema = {
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
  // userId:{
  //   field: 'user_id',
  //   allowNull: false,
  //   type: DataTypes.INTEGER,
  //   references: {
  //     model: USER_TABLE,
  //     key: 'id',
  //   },
  //   onUpdate: 'CASCADE',
  //   onDelete: 'CASCADE'
  // },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  }
}

class List extends Model {
  static associate(models) {
    this.hasMany(models.Card, {
      as: 'card',
      foreignKey: 'listId',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: LIST_TABLE,
      modelName: 'List',
      timestamps: false
    }
  }
}


module.exports = { LIST_TABLE, ListSchema, List }
