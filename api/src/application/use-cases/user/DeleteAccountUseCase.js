const boom = require("@hapi/boom");

class DeleteAccountUseCase {
  constructor(userRepository){
    this.userRepository = userRepository;
  }

  async execute(userId){
    const user = await this.userRepository.findById(userId);
    if(!user){
      throw boom.notFound('User not found');
    }

    const rowsDeleted = await this.userRepository.delete(userId);
    return rowsDeleted;
  }
}

module.exports = DeleteAccountUseCase;
