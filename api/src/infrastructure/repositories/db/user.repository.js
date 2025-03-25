const IUserRepository = require('../../../domain/repositories/IUserRepository');

class UserRepository extends IUserRepository {
  constructor(db){
    super();
    this.db = db;
  }

  async findByEmailToLogin(email){
    return await this.db.models.User.findOne({
      where: { email },
      attributes:  { exclude: ['recoveryToken']  }
    });
  }

  async findByEmail(email) {
    return await this.db.models.User.findOne({
      where: { email },
      attributes:  { exclude: ['password', 'recoveryToken']  }
    });
  }

  async findAll() {
    return await this.db.models.User.findAll({
      attributes:  { exclude: ['password', 'recoveryToken']  }
    });
  }

  async create(userData) {
    return await this.db.models.User.create(userData,
      { attributes:  { exclude: ['password', 'recoveryToken']  } }
    );
  }

  async findById(userId) {
    return await this.db.models.User.findByPk(userId,
      { attributes:  { exclude: ['password', 'recoveryToken']  } }
    );
  }

  async delete(userId) {
    return await this.db.models.User.destroy({
      where: { id: userId}
    });
  }

  async update(id, userData){
    return await this.db.models.User.update(userData,
      { where: { id } }
    );
  }
}

module.exports = UserRepository;
