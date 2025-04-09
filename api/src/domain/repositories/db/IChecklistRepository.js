const boom = require('@hapi/boom');

class IChecklistRepository {
  async create(checklistEntity){
    throw boom.notImplemented('the create(checklistEntity) method is not implemented');
  }

  async update(checklistUpdateEntity){
    throw boom.notImplemented('the update(checklistUpdateEntity) method is not implemented');
  }

  async delete(checklistId){
    throw boom.notImplemented('the delete(checklistId) method is not implemented');
  }

  async findChecklistsByProject(projectId){
    throw boom.notImplemented('the create(projectId) method is not implemented');
  }

  async findChecklistsByCard(cardId){
    throw boom.notImplemented('the findChecklistsByCard(cardId) method is not implemented');
  }

  async findAll(projectId){
    throw boom.notImplemented('the findAll(projectId) method is not implemented');
  }

  async findOneByIdWithData(checklistId){
    throw boom.notImplemented('the findOneByIdWithData(checklistId) method is not implemented');
  }
}

module.exports = IChecklistRepository;
