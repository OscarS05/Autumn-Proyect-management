const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const sequelize = require('../libs/sequelize');

const { WorkspaceRedis } = require('./redis/index');
const { ProjectRedis } = require('./redis/index');


class WorkspaceService {
  constructor() {}

  async create({ name, description, userId }) {
    const transaction = await sequelize.transaction();
    try {
      const workspace = await models.Workspace.create(
        { name: name, description: description, userId: userId },
        { transaction }
      );
      await models.WorkspaceMember.create(
        { userId, workspaceId: workspace.dataValues.id, role: 'admin', propertyStatus: 'owner'},
        { transaction }
      )

      await transaction.commit();
      await WorkspaceRedis.saveWorkspaces(userId, [ workspace.dataValues ]);

      return workspace;
    } catch (error) {
      await transaction.rollback();
      console.error('Error:', error);
      return boom.badRequest('Failed to create workspace');
    }
  }

  async update(workspaceId, data, userId) {
    if(Object.keys(data).length === 0){
      throw boom.badRequest('Please, try again');
    }

    try {
      const [updatedRows, [updatedWorkspace]] = await models.Workspace.update(data, {
        where: { id: workspaceId, userId },
        returning: true,
      });

      await WorkspaceRedis.updateWorkspace(updatedWorkspace.dataValues);

      if(!updatedRows) return boom.notFound('Workspace not found');
      return updatedWorkspace;
    } catch (error) {
      console.error('Error:', error);
      return boom.badRequest('Failed to update workspace');
    }
  }

  async delete(userId, workspaceId){
    const transaction = await sequelize.transaction();
    try {
      const deleted = await models.Workspace.destroy({
        where: { id: workspaceId, userId },
        transaction
      });

      if (deleted === 0){
        await transaction.rollback();
        throw boom.notFound('Workspace not found or unauthorized');
      }

      await transaction.commit();
      await WorkspaceRedis.deleteWorkspace(workspaceId);

      return deleted;
    } catch (error) {
      await transaction.rollback();
      throw boom.badRequest('Failed to delete workspace');
    }
  }

  async findWorkspaceAndItsProjects(workspaceId, userId){
    try {
      const Workspace = await models.Workspace.findAll({
        where: { id: workspaceId },
        include: [{ model: models.Project, as: 'project' }]
      });
      const { workspace, projects } = Workspace.reduce((acc, data) => {
        if(data.dataValues){
          acc.workspace.push(data.dataValues);
        } else if (data.dataValues.project > 0){
          acc.projects.push(data.dataValues.projects);
        }
        return acc;
      }, { workspace: [], projects: [] });

      await WorkspaceRedis.saveWorkspaces(userId, workspace);
      await ProjectRedis.saveProjects(workspace.id, projects);
      return workspace;
    } catch (error) {
      console.error('Error:', error);
      return boom.internal('Error:', error);
    }
  }

  async findWorkspacesAndProjects(userId) {
    try {
      const Workspaces = await models.WorkspaceMember.findAll({
        where: { userId },
        include: [{
            model: models.Workspace,
            as: 'workspace',
            include: [{ model: models.Project, as: 'project', }],
          }],
      });

      const listOfWorkspaces = Workspaces.map(member => member.workspace.dataValues);
      await WorkspaceRedis.saveWorkspaces(userId, listOfWorkspaces);

      const organizedWorkspaces = listOfWorkspaces.reduce((acc, data) => {
        if(data.userId === userId){
          acc.owner.push(data);
        } else if(data.userId !== userId){
          acc.guest.push(data);
        }
        return acc;
      }, { owner: [], guest: [] });

      return organizedWorkspaces;
    } catch (error) {
      return boom.internal('Error:', error);
    }
  }

  async countWorkspacesByUserId(userId){
    const count = await models.Workspace.count(
      { where: { userId } }
    );
    return count;
  }
}

module.exports = WorkspaceService;
