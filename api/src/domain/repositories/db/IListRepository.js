const boom = require('@hapi/boom');

class IListRepository {
  async create(listEntity){
    throw boom.notImplemented('the create(listEntity) method is not implemented');
  }

  async update(listUpdateEntity){
    throw boom.notImplemented('the update(listUpdateEntity) method is not implemented');
  }

  async delete(listId){
    throw boom.notImplemented('the delete(listId) method is not implemented');
  }

  async findOneById(listId){
    throw boom.notImplemented('the findById(listId) method is not implemented');
  }

  async findAll(projectId){
    throw boom.notImplemented('the findAll(projectId) method is not implemented');
  }
}

module.exports = IListRepository;
