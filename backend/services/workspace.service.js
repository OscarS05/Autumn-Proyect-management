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

  async transferOwnership(workspaceId, currentOwnerId, newOwnerId){
    const transaction = await sequelize.transaction();
    try {
      const workspace = await models.Workspace.findOne({
        where: { id: workspaceId, userId: currentOwnerId },
        include: {
          model: models.User,
          as: 'members',
          attributes: ['id', 'name'],
          where: { id: newOwnerId },
          required: false
        }
      });
      console.log('workspace:', workspace.dataValues);
      if(!workspace || workspace.members.length === 0){
        throw boom.badRequest('Workspace not found or new owner is incorrect');
      }

      const [updatedRows, [updatedWorkspace]] = await models.Workspace.update(
        { userId: newOwnerId },
        { where: { id: workspaceId }, returning: true, transaction },
      );
      if(updatedRows === 0){
        await transaction.rollback();
        throw boom.badRequest('Failed to update workspace owner');
      }

      await models.WorkspaceMember.update(
        { propertyStatus: 'owner', role: 'admin' },
        { where: { workspaceId, userId: newOwnerId }, transaction }
      );
      await models.WorkspaceMember.update(
        { propertyStatus: 'guest', role: 'member' },
        { where: { workspaceId, userId: currentOwnerId }, transaction }
      );

      await transaction.commit();
      await WorkspaceRedis.updateWorkspace(updatedWorkspace);
      return updatedWorkspace;
    } catch (error) {
      await transaction.rollback();
      console.error('Error:', error);
      throw boom.badRequest('Failed to transfer ownership');
    }
  }

  async delete(userId, workspaceId){
    const transaction = await sequelize.transaction();
    try {
      const deleted = await models.Workspace.destroy({
        where: { id: workspaceId, userId }
      });

      if (deleted === 0){
        await transaction.rollback();
        throw boom.notFound('Workspace not found or unauthorized');
      }

      await models.WorkspaceMember.destroy({
        where: { workspaceId },
        transaction
      });

      await transaction.commit();
      await WorkspaceRedis.deleteWorkspace(userId, workspaceId);

      return deleted;
    } catch (error) {
      await transaction.rollback();
      console.error('Error:', error);
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
      return listOfWorkspaces;
    } catch (error) {
      console.error('Error:', error);
      return boom.internal('Error:', error);
    }
  }
}

module.exports = WorkspaceService;
