const boom = require('@hapi/boom');

class ILabelRepository {
  async create(labelEntity){
    throw boom.notImplemented('the create(labelEntity) method is not implemented');
  }

  async create(labelEntity){
    throw boom.notImplemented('the create(labelEntity) method is not implemented');
  }

  async createVisibilityOfLabel(cardId, labelId){
    throw boom.notImplemented('the createVisibilityOfLabel(cardId, labelId method is not implemented');
  }

  async updateVisibility(ids, updateVisibilityLabelEntity){
    throw boom.notImplemented('the updateVisibility(ids, updateVisibilityLabelEntity) method is not implemented');
  }

  async findLabelsByCard(cardId){
    throw boom.notImplemented('the findLabelsByCard(cardId) method is not implemented');
  }

  async update(labelUpdateEntity){
    throw boom.notImplemented('the update(labelUpdateEntity) method is not implemented');
  }

  async delete(labelId){
    throw boom.notImplemented('the delete(labelId) method is not implemented');
  }

  async findOneById(labelId){
    throw boom.notImplemented('the findById(labelId) method is not implemented');
  }

  async findAll(projectId){
    throw boom.notImplemented('the findAll(projectId) method is not implemented');
  }
}

module.exports = ILabelRepository;
