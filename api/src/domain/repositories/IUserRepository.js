const boom = require('@hapi/boom');

class IUserRepository {
  async create(userEntity){
    throw boom.notImplemented('the create() method is not implemented');
  }

  async findById(userEntity){
    throw boom.notImplemented('the findById() method is not implemented');
  }

  async findByEmail(userEntity){
    throw boom.notImplemented('the findByEmail() method is not implemented');
  }

  async update(userEntity){
    throw boom.notImplemented('the update() method is not implemented');
  }

  async delete(userEntity){
    throw boom.notImplemented('the delete() method is not implemented');
  }

  async findAll(){
    throw boom.notImplemented('the findAll() method is not implemented');
  }
}

module.exports = IUserRepository;
