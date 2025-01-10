const { Model, DataTypes, Sequelize } = require('sequelize');
const { CHECKLIST_TABLE } = require('./checklist.model');


const ITEM_TABLE = 'items';

const ItemSchema = {
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
  checklistId: {
    field: 'checklist_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: CHECKLIST_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  status: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  startDate: {
    allowNull: true,
    type: DataTypes.DATE,
    field: 'start_date',
  },
  endDate: {
    allowNull: true,
    type: DataTypes.DATE,
    field: 'end_date',
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  }
}

class Item extends Model {
  static associate(models) {
    this.belongsTo(models.Checklist, { as: 'checklist' });

    this.belongsToMany(models.ProjectMember, {
      through: models.ItemMember,
      foreignKey: 'itemId',
      as: 'members',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ITEM_TABLE,
      modelName: 'Item',
      timestamps: false
    }
  }
}


module.exports = { ITEM_TABLE, ItemSchema, Item }
