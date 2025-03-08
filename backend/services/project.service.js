const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

const { ProjectRedis } = require('../services/redis/index');
const sequelize = require('../libs/sequelize');


class ProjectService {
  constructor() {}

  async create({ name, visibility, workspaceId, workspaceMemberId }) {
    const transaction = await sequelize.transaction();
    try {
      const workspaceMember = await models.WorkspaceMember.findOne(
        { where: { id: workspaceMemberId } }
      );
      if(workspaceMember.workspaceId !== workspaceId) throw boom.badRequest('WorkspaceId is wrong');

      const project = await models.Project.create(
        { name, visibility, workspaceId: workspaceMember.workspaceId, workspaceMemberId:workspaceMember.id },
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
    try {
      const [updatedRows, [updatedProject]] = await models.Project.update(data, {
        where: { id },
        returning: true,
      });
      if(updatedRows === 0) throw boom.notFound('Project not found');
      if(!updatedProject) throw boom.notFound('Failed to update project');

      await ProjectRedis.updateProject(updatedProject.dataValues);
      return updatedProject.dataValues;
    } catch (error) {
      console.error('Error:', error);
      throw boom.badRequest(error.message || 'Failed to update project');
    }
  }

  async transferOwnership(projectId, currentOwnerId, newOwnerId){
    const transaction = await sequelize.transaction();
    try {
      const project = await models.Project.findOne({
        where: { id: projectId, workspaceMemberId: currentOwnerId },
        include: {
          model: models.WorkspaceMember,
          as: 'members',
          attributes: ['id', 'role', 'property_status'],
          where: { id: newOwnerId },
          required: false
        }
      });
      if(!project){
        throw boom.badRequest('Project not found');
      }
      if(project.members.length === 0){
        throw boom.badRequest('New owner is incorrect');
      }

      const [ updatedRows, [updatedProject] ] = await models.Project.update(
        { workspaceMemberId: newOwnerId },
        { where: { id: projectId }, returning: true, transaction },
      );
      if(updatedRows === 0){
        throw boom.badRequest('Failed to update owner in project');
      }

      await models.ProjectMember.update(
        { role: 'admin', propertyStatus: 'owner' },
        { where: { projectId, workspaceMemberId: newOwnerId }, transaction }
      );
      await models.ProjectMember.update(
        { role: 'member', propertyStatus: 'guest' },
        { where: { projectId, workspaceMemberId: currentOwnerId }, transaction }
      );

      await transaction.commit();
      await ProjectRedis.updateProject(updatedProject);
      return updatedProject;
    } catch (error) {
      await transaction.rollback();
      console.error('Error:', error);
      throw boom.badRequest(error.message || 'Failed to transfer ownership');
    }
  }

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
    try {
      const Projects = await models.Project.findAll({
        where: { workspaceId }
      });
      const listOfProjects = Projects.map(Project => Project.dataValues);
      await ProjectRedis.saveProjects(listOfProjects);
      return listOfProjects;
    } catch (error) {
      console.error('Error:', error);
      throw boom.badRequest(error.message || 'Error retrieving projects from the database');
    }
  }

  async countProjectsByWorkspaceMember(workspaceId, workspaceMemberId){
    const count = await models.Project.count(
      { where: { workspaceId, workspaceMemberId } }
    )

    return count;
  }
}

module.exports = ProjectService;
