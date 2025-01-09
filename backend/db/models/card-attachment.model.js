const { Model, DataTypes, Sequelize } = require('sequelize');
const { CARD_TABLE } = require('./card.model');
const { PROJECT_MEMBER_TABLE } = require('./project-member.model');

const CARD_ATTACHMENT_TABLE = 'card_attachments';

const CardAttachmentSchema = {
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
  attachmentUrl: {
    allowNull: false,
    type: DataTypes.STRING
  },
  cardId: {
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
  updatedBy: {
    field: 'updated_by',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: PROJECT_MEMBER_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }
}

class CardAttachment extends Model {
  static associate(models) {
    this.belongsTo(models.Card, { as: 'card' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CARD_ATTACHMENT_TABLE,
      modelName: 'CardAttachment',
      timestamps: false
    }
  }
}


module.exports = { CARD_ATTACHMENT_TABLE, CardAttachmentSchema, CardAttachment }
