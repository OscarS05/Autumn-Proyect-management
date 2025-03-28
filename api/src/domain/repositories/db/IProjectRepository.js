const boom = require('@hapi/boom');

class IProjectRepository {
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

  async findAll(){
    throw boom.notImplemented('the findAll() method is not implemented');
  }
}

module.exports = IProjectRepository;
