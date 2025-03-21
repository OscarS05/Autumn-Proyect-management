const boom = require('@hapi/boom');
const { PassThrough } = require('nodemailer/lib/xoauth2');

class ProjectService {
  constructor(sequelize, models, redisModels) {
    this.sequelize = sequelize;
    this.models = models;
    this.redisModels = redisModels;
  }

  async create({ name, visibility, workspaceId, workspaceMemberId }) {
    const transaction = await this.sequelize.transaction();
    try {
      const workspaceMember = await this.models.WorkspaceMember.findOne(
        { where: { id: workspaceMemberId } }
      );
      if(workspaceMember.workspaceId !== workspaceId) throw boom.badRequest('WorkspaceId is wrong');

      const project = await this.models.Project.create(
        { name, visibility, workspaceId: workspaceMember.workspaceId, workspaceMemberId:workspaceMember.id },
        { transaction }
      );

      await this.models.ProjectMember.create(
        { workspaceMemberId, role: 'admin', propertyStatus: 'owner', projectId: project.id },
        { transaction },
      );
      await transaction.commit();
      await this.redisModels.ProjectRedis.saveProjects([ project.dataValues ]);

      return project;
    } catch (error) {
      await transaction.rollback();
      throw boom.badRequest(error.message || 'Failed to create project');
    }
  }

  async update(id, data) {
    try {
      const [updatedRows, [updatedProject]] = await this.models.Project.update(data, {
        where: { id },
        returning: true,
      });
      if(updatedRows === 0) throw boom.notFound('Project not found');
      if(!updatedProject) throw boom.notFound('Failed to update project');

      await this.redisModels.ProjectRedis.updateProject(updatedProject.dataValues);
      return updatedProject.dataValues;
    } catch (error) {
      throw boom.badRequest(error.message || 'Failed to update project');
    }
  }

  async delete(projectId, workspaceId, workspaceMemberId, projectMemberId){
    const transaction = await this.sequelize.transaction();

    try {
      const response = await this.models.Project.destroy(
        { where: { id: projectId, workspaceMemberId }, transaction }
      );
      if(response === 0){
        throw boom.notFound('Failed to delete project');
      }
      await this.models.ProjectMember.destroy(
        { where: { id: projectMemberId, workspaceMemberId, projectId }, transaction }
      );

      await transaction.commit();
      await this.redisModels.ProjectRedis.deleteProject(projectId, workspaceId);

      return response;
    } catch (error) {
      await transaction.rollback();
      throw boom.badRequest(error.message || 'Failed to delete project')
    }
  }

  async findAll(workspaceId){
    try {
      const Projects = await this.models.Project.findAll({
        where: { workspaceId }
      });
      const listOfProjects = Projects.map(Project => Project.dataValues);
      await this.redisModels.ProjectRedis.saveProjects(listOfProjects);
      return listOfProjects;
    } catch (error) {
      throw boom.badRequest(error.message || 'Error retrieving projects from the database');
    }
  }

  async findProjectWorkspace(projectId){
    try {
      const project = await this.models.Project.findOne({
        where: { id: projectId }
      });

      const workspaceId = project.workspaceId;
      return workspaceId;
    } catch (error) {
      throw boom.badRequest(error.message || 'Failed to find project workspace');
    }
  }

  async countProjectsByWorkspaceMember(workspaceId, workspaceMemberId){
    const count = await this.models.Project.count(
      { where: { workspaceId, workspaceMemberId } }
    )

    return count;
  }

  async findProjectsByRequester(workspaceMemberId){
    try {
      const projectsWithMembers = await this.models.Project.findAll({
        where: { workspaceMemberId },
        include: [{
          model: this.models.ProjectMember,
          as: 'projectMembers',
          attributes: ['id', 'projectId', 'workspaceMemberId'],
          required: false,
        }]
      });
      return projectsWithMembers;
    } catch (error) {
      throw boom.badRequest(error.message || 'Something went wrong while searching for projects by workspace member id');
    }
  }
}

module.exports = ProjectService;
