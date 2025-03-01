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

  // async update(id, data) {
  //   const allowedFields = ["name", "description"];

  //   const changes = Object.keys(data)
  //   .filter(key => allowedFields.includes(key))
  //   .reduce((obj, key) => {
  //     obj[key] = data[key];
  //     return obj;
  //   }, {});

  //   if(Object.keys(changes).length === 0){
  //     throw boom.badRequest('Please, try again');
  //   }

  //   const [updatedRows, [updatedWorkspace]] = await models.Workspace.update(changes, {
  //     where: { id },
  //     returning: true,
  //   });

  //   await redisService.updateWorkspace(updatedWorkspace.dataValues);

  //   if(!updatedRows) return boom.notFound('Workspace not found');
  //   return updatedWorkspace;
  // }

  // async delete(userId, workspaceId){
  //   if(!workspaceId){
  //     return boom.badRequest('Please, try again');
  //   }

  //   const response = await models.Workspace.destroy({
  //     where: { id: workspaceId }
  //   });
  //   await redisService.deleteWorkspace(userId, workspaceId);
  //   return response;
  // }

  // async findById(id){
  //   const workspace = await models.Workspace.findByPk(id);
  //   if(!workspace) throw boom.notFound('Workspace not found');

  //   return workspace;
  // }

  async findAll(conditional){
    const Projects = await models.Project.findAll(conditional || {});
    if (!Projects || Projects.length === 0) {
      return [];
    }
    const listOfProjects = Projects.map(Project => Project.dataValues);
    // await ProjectRedis.saveProjects(listOfProjects[0].userId, listOfWorkspaces);
    return Projects.map(Project => Project);
  }
}

module.exports = ProjectService;
