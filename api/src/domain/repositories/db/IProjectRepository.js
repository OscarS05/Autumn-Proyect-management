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

  async findAllByWorkspace(){
    throw boom.notImplemented('the findAllByWorkspace() method is not implemented');
  }

  async findAllByWorkspaceMember(){
    throw boom.notImplemented('the findAllByWorkspaceMember() method is not implemented');
  }
}

module.exports = IProjectRepository;
