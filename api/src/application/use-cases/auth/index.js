const dbRepositories = require('../../../infrastructure/repositories/db/index');
const redisServices = require('../../../infrastructure/repositories/cache/index');

const LoginUseCase = require('./loginUseCase');
const GenerateTokensUseCase = require('./generateTokensUseCase');
const SendEmailConfirmationUseCase = require('./sendEmailConfirmationUseCase');
const VerifyEmailByTokenUseCase = require('./verifyEmailByTokenUseCase');

const loginUseCase = new LoginUseCase(dbRepositories);
const generateTokensUsecase = new GenerateTokensUseCase(redisServices);
const sendEmailConfirmationUseCase = new SendEmailConfirmationUseCase(redisServices, dbRepositories)
const verifyEmailByTokenUseCase = new VerifyEmailByTokenUseCase(redisServices, dbRepositories)

module.exports = {
  loginUseCase,
  generateTokensUsecase,
  sendEmailConfirmationUseCase,
  verifyEmailByTokenUseCase,
}
