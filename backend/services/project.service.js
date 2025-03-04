const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

const { ProjectRedis } = require('../services/redis/index');


class ProjectService {
  constructor() {}

  async create({ name, visibility, workspaceId, workspaceMemberId }) {
    const project = await models.Project.create({ name, visibility, workspaceId, workspaceMemberId });
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

  // next feat:
  // async transferOwnership({ workspaceId, ownerUserId, newOwnerId, tran }){
    // const workspace = await models.Workspace.findOne({
    //   where: { id: workspaceId, userId: currentUserId },
    //   include: {
    //     model: models.WorkspaceMember,
    //     as: 'members',
    //     where: { userId: newOwnerId },
    //     required: false
    //   }
    // });

    // const isMember = workspace?.members?.length > 0;

    // console.log('Workspace:', workspace);
    // console.log('Es miembro:', isMember);
  // }

  async delete(projectId, workspaceId, workspaceMemberId){
    try {
      const response = await models.Project.destroy({
        where: { id: projectId, workspaceMemberId }
      });
      if(response > 0){
        await ProjectRedis.deleteWorkspace(projectId, workspaceId);
      }
      return response;
    } catch (error) {
      console.log('Error:', error);
      throw boom.badRequest('Failed to delete project')
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
