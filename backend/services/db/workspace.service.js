const boom = require('@hapi/boom');

class WorkspaceService {
  constructor(sequelize, models, redisModels) {
    this.sequelize = sequelize;
    this.models = models;
    this.redisModels = redisModels;
  }

  async create({ name, description, userId }) {
    const transaction = await this.sequelize.transaction();
    try {
      const workspace = await this.models.Workspace.create(
        { name: name, description: description, userId: userId },
        { transaction }
      );
      const workspaceMember = await this.models.WorkspaceMember.create(
        { userId, workspaceId: workspace.dataValues.id, role: 'admin', propertyStatus: 'owner'},
        { transaction }
      )

      await transaction.commit();

      try {
        Promise.all([
          await this.redisModels.WorkspaceRedis.saveWorkspaces(userId, [ workspace.dataValues ]),
          await this.redisModels.WorkspaceMemberRedis.saveWorkspaceIdByUserId(
            userId,
            [workspaceMember.workspaceId],
            [workspaceMember.id]
          ),
        ])
      } catch (error) {
        throw boom.badRequest(error.message || 'Something went wrong to save workspace in Redis');
      }

      return workspace;
    } catch (error) {
      await transaction.rollback();
      return boom.badRequest(error.message || 'Failed to create workspace');
    }
  }

  async update(workspaceId, data, userId) {
    if(Object.keys(data).length === 0){
      throw boom.badRequest('Please, try again');
    }

    try {
      const [updatedRows, [updatedWorkspace]] = await this.models.Workspace.update(data, {
        where: { id: workspaceId, userId },
        returning: true,
      });

      await this.redisModels.WorkspaceRedis.updateWorkspace(updatedWorkspace.dataValues);

      if(!updatedRows) return boom.notFound('Workspace not found');
      return updatedWorkspace;
    } catch (error) {
      return boom.badRequest(error.message || 'Failed to update workspace');
    }
  }

  async delete(userId, workspaceId){
    const transaction = await this.sequelize.transaction();
    try {
      const deleted = await this.models.Workspace.destroy({
        where: { id: workspaceId, userId },
        transaction
      });

      if (deleted === 0){
        await transaction.rollback();
        throw boom.notFound('Workspace not found or unauthorized');
      }

      await transaction.commit();
      await this.redisModels.WorkspaceRedis.deleteWorkspace(workspaceId);

      return deleted;
    } catch (error) {
      await transaction.rollback();
      throw boom.badRequest(error.message || 'Failed to delete workspace');
    }
  }

  async findWorkspaceAndItsProjects(workspaceId, userId){
    try {
      const Workspace = await this.models.Workspace.findAll({
        where: { id: workspaceId },
        include: [{ model: this.models.Project, as: 'project' }]
      });

      await this.redisModels.WorkspaceRedis.saveWorkspaces(userId, Workspace);
      return Workspace;
    } catch (error) {
      return boom.badRequest(error.message || 'Failed to find the workspace and its projects');
    }
  }

  async findWorkspacesAndProjects(userId) {
    try {
      const Workspaces = await this.models.WorkspaceMember.findAll({
        where: { userId },
        include: [{
            model: this.models.Workspace,
            as: 'workspace',
            include: [{ model: this.models.Project, as: 'project', }],
          }],
      });
      if(Workspaces.length === 0) return [];

      const { workspaceIds, workspaceMemberIds } = Workspaces.reduce((acc, data) => {
        if(data){
          acc.workspaceIds.push(data.workspaceId);
          acc.workspaceMemberIds.push(data.id);
        }
        return acc;
      }, { workspaceIds: [], workspaceMemberIds: [] });

      const listOfWorkspaces = Workspaces.map(member => member.workspace.dataValues);

      await this.redisModels.WorkspaceRedis.saveWorkspaces(userId, listOfWorkspaces);
      await this.redisModels.WorkspaceMemberRedis.saveWorkspaceIdByUserId(
        userId,
        workspaceIds,
        workspaceMemberIds
      );

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
      throw boom.badRequest(error.message || 'Failed to find workspaces and projects');
    }
  }

  async countWorkspacesByUserId(userId){
    const count = await this.models.Workspace.count(
      { where: { userId } }
    );
    return count;
  }
}

module.exports = WorkspaceService;
