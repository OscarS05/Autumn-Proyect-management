const boom = require('@hapi/boom');
const IProjectRepository = require('../../../domain/repositories/db/IProjectRepository');

class ProjectRepository extends IProjectRepository{
  constructor(db){
    super();
    this.db = db;
  }

  async create(projectEntity){
    throw boom.notImplemented('the create() method is not implemented');
  }

  async update(projectEntity){
    throw boom.notImplemented('the update() method is not implemented');
  }

  async delete(workspaceId){
    throw boom.notImplemented('the delete() method is not implemented');
  }

  async findById(workspaceId){
    throw boom.notImplemented('the findById() method is not implemented');
  }

  async findAll(workspaceId){
    return await this.db.models.Project.findAll(
      { where: { workspaceId } }
    );
  }
}

module.exports = ProjectRepository;
