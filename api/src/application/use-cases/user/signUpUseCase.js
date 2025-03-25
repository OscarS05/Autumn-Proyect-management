const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const UserDto = require('../../dtos/user.dto');
const UserEntity = require('../../../domain/entities/UserEntity');

class SignUpUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(userData) {
    const userAlreadyExists = await this.userRepository.findByEmail(userData.email);
    if (userAlreadyExists) throw boom.conflict('User already exists');

    userData.password = await bcrypt.hash(userData.password, 10);

    const user = new UserEntity(userData)
    const formattedUser = {
      id: user.id,
      name: user.name,
      email: user.email.value,
      password: user.password.value,
      recoveryToken: user.recoveryToken,
      role: user.role
    }
    const userCreated = await this.userRepository.create(formattedUser);
    return new UserDto(userCreated);
  }
}

module.exports = SignUpUseCase;
