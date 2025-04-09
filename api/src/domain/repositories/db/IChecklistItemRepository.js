const boom = require('@hapi/boom');

class IChecklistItemRepository {
  async create(checklistItemEntity){
    throw boom.notImplemented('the create(checklistItemEntity) method is not implemented');
  }

  async update(checklistItemUpdateEntity){
    throw boom.notImplemented('the update(checklistItemUpdateEntity) method is not implemented');
  }

  async delete(checklistItemId){
    throw boom.notImplemented('the delete(checklistItemId) method is not implemented');
  }

  async findOneByIdAndProject(checklistItemId, projectId){
    throw boom.notImplemented('the findOneByIdAndProject(checklistItemId, projectId) method is not implemented');
  }

  async findOne(checklistItemId){
    throw boom.notImplemented('the findOneByIdAndProject(checklistItemId, projectId) method is not implemented');
  }

  async findAll(projectId){
    throw boom.notImplemented('the findAll(projectId) method is not implemented');
  }
}

module.exports = IChecklistItemRepository;
