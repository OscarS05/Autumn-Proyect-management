const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

const { ProjectRedis } = require('../services/redis/index');


class ProjectService {
  constructor() {}

  async create({ name, visibility, workspaceId }) {
    if(!name || !visibility || !workspaceId){
      return boom.badRequest('Please, try again');
    }

    const project = await models.Project.create({ name: name, visibility: visibility, workspaceId: workspaceId });
    if(!project){
      return boom.badRequest('Failed to create card');
    }
    await ProjectRedis.saveProjects([ project.dataValues ]);
    return project;
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

  async delete(projectId, workspaceId){
    const response = await models.Project.destroy({
      where: { id: projectId }
    });
    await ProjectRedis.deleteWorkspace(projectId, workspaceId);
    return response;
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
