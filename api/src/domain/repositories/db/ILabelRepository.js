const boom = require('@hapi/boom');

class ILabelRepository {
  async create(labellEntity){
    throw boom.notImplemented('the create(labellEntity) method is not implemented');
  }

  async update(labellUpdateEntity){
    throw boom.notImplemented('the update(labellUpdateEntity) method is not implemented');
  }

  async delete(labellId){
    throw boom.notImplemented('the delete(labellId) method is not implemented');
  }

  async findOneById(labellId){
    throw boom.notImplemented('the findById(labellId) method is not implemented');
  }

  async findAll(projectId){
    throw boom.notImplemented('the findAll(projectId) method is not implemented');
  }
}

module.exports = ILabelRepository;
