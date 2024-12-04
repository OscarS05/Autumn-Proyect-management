const { Model, DataTypes, Sequelize } = require('sequelize');


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
  createAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  }
}

class List extends Model {
  static associate(models) {
    // this.hasOne(models.Customer, {
    //   as: 'customer',
    //   foreignKey: 'userId'
    // });
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
