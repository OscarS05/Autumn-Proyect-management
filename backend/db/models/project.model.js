const { Model, DataTypes, Sequelize } = require('sequelize');
const { WORKSPACE_TABLE } = require('./workspace.model');


const PROJECT_TABLE = 'projects';

const ProjectSchema = {
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
  visibility: {
    allowNull: false,
    type: Sequelize.DataTypes.STRING,
  },
  workspaceId:{
    field: 'workspace_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: WORKSPACE_TABLE,
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

class Project extends Model {
  static associate(models) {
    this.belongsTo(models.Workspace, { as: 'workspace' });

    this.belongsToMany(models.WorkspaceMember, {
      through: models.ProjectMember,
      foreignKey: 'projectId',
      as: 'members'
    });

    this.hasMany(models.List, {
      as: 'list',
      foreignKey: 'projectId',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PROJECT_TABLE,
      modelName: 'Project',
      timestamps: false
    }
  }
}


module.exports = { PROJECT_TABLE, ProjectSchema, Project };
