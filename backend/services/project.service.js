const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

const { ProjectRedis } = require('../services/redis/index');
const sequelize = require('../libs/sequelize');


class ProjectService {
  constructor() {}

  async create({ name, visibility, workspaceId, workspaceMemberId }) {
    const transaction = await sequelize.transaction();
    try {
      const project = await models.Project.create(
        { name, visibility, workspaceId, workspaceMemberId },
        { transaction }
      );

      await models.ProjectMember.create(
        { workspaceMemberId, role: 'admin', propertyStatus: 'owner', projectId: project.id },
        { transaction },
      );
      await transaction.commit();
      await ProjectRedis.saveProjects([ project.dataValues ]);
      return project;
    } catch (error) {
      await transaction.rollback();
      console.error('Error:', error);
      throw boom.badRequest(error.message || 'Failed to create project');
    }
  }

  async update(id, data) {
    if(Object.keys(data).length === 0){
      throw boom.badRequest('Please, try again');
    }

    const [updatedRows, [updatedProject]] = await models.Project.update(data, {
      where: { id },
      returning: true,
    });
    await ProjectRedis.updateProject(updatedProject.dataValues);

    if(!updatedRows) return boom.notFound('Project not found');
    return updatedProject.dataValues;
  }

  // async transferOwnership(projectId, ownerUserId, newOwnerId){
  //   const transaction = await sequelize.transaction();
  //   try {
  //     const project = await models.Project.findOne({
  //       where: { id: projectId, workspaceMemberId: ownerUserId },
  //       include: {
  //         model: models.WorkspaceMember,
  //         as: 'members',
  //         attributes: ['id', 'name'],
  //         where: { id: newOwnerId },
  //         required: false
  //       }
  //     });
  //     if(!project){
  //       throw boom.badRequest('Project not found');
  //     }
  //     if(project.members.length === 0){
  //       throw boom.badRequest('New owner is incorrect');
  //     }

  //     const updatedProject = await models.Project.update(
  //       { workspaceMemberId: newOwnerId },
  //       { where: { id: projectId }, returning: true, transaction },
  //     );
  //     if(updatedProject[0] === 0){
  //       await transaction.rollback();
  //       throw boom.badRequest('Failed to update owner in project');
  //     }

  //     await models.ProjectMember.update(
  //       { role: 'admin', propertyStatus: 'owner' },
  //       { where: { projectId, workspaceMemberId: newOwnerId }, transaction }
  //     );
  //     await models.ProjectMember.update(
  //       { role: 'member', propertyStatus: 'guest' },
  //       { where: { projectId, workspaceMemberId: ownerUserId }, transaction }
  //     );

  //     await transaction.commit();
  //     await ProjectRedis.updateProject(updatedProject[1][0]);
  //     return updatedProject[1][0];
  //   } catch (error) {
  //     await transaction.rollback();
  //     console.error('Error:', error);
  //     throw boom.badRequest(error.message || 'Failed to transfer ownership');
  //   }
  // }

  async delete(projectId, workspaceId, workspaceMemberId, projectMemberId){
    const transaction = await sequelize.transaction();

    try {
      const response = await models.Project.destroy(
        { where: { id: projectId, workspaceMemberId }, transaction }
      );
      if(response === 0){
        throw boom.notFound('Failed to delete project');
      }
      await models.ProjectMember.destroy(
        { where: { id: projectMemberId, workspaceMemberId, projectId }, transaction }
      );

      await transaction.commit();
      await ProjectRedis.deleteProject(projectId, workspaceId);
      return response;
    } catch (error) {
      await transaction.rollback();
      console.log('Error:', error);
      throw boom.badRequest(error.message || 'Failed to delete project')
    }
  }

  async findAll(workspaceId){
    const Projects = await models.Project.findAll({
      where: { workspaceId }
    });
    if (!Projects || Projects.length === 0) {
      return [];
    }
    const listOfProjects = Projects.map(Project => Project.dataValues);
    await ProjectRedis.saveProjects(listOfProjects);
    return listOfProjects;
  }
}

module.exports = ProjectService;
