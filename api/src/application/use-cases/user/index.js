const { userRepository } = require('../../../infrastructure/repositories/db/index');

const GetUserByEmailUseCase = require('./getUserByEmailUseCase');
const GetUserUseCase = require('./getUsersUserCase');
const SignUpUseCase = require('./signUpUseCase');
const UpdateUserUseCase = require('./updateUserUseCase');
const ChangePasswordUseCase = require('./changePasswordUseCase');
const DeleteAccountUseCase = require('./DeleteAccountUseCase');

const getUserByEmailUseCase = new GetUserByEmailUseCase(userRepository);
const getUserUseCase = new GetUserUseCase(userRepository);
const signUpUseCase = new SignUpUseCase(userRepository);
const updateUserUseCase = new UpdateUserUseCase(userRepository);
const changePasswordUseCase = new ChangePasswordUseCase(userRepository);
const deleteAccountUseCase = new DeleteAccountUseCase(userRepository);

module.exports = {
  getUserByEmailUseCase,
  getUserUseCase,
  signUpUseCase,
  updateUserUseCase,
  changePasswordUseCase,
  deleteAccountUseCase,
};
