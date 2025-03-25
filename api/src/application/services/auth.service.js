const jwt = require('jsonwebtoken');
const boom = require('@hapi/boom');
const { config } = require('../../../config/config');


class AuthService {
  constructor(
    { loginUseCase, generateTokensUsecase, sendEmailConfirmationUseCase, verifyEmailByTokenUseCase },
    { getUserByEmailUseCase, updateUserUseCase, changePasswordUseCase }) {
      // auth use-cases
    this.loginUseCase = loginUseCase;
    this.generateTokensUsecase = generateTokensUsecase;
    this.sendEmailConfirmationUseCase = sendEmailConfirmationUseCase;
    this.verifyEmailByTokenUseCase = verifyEmailByTokenUseCase;

      // user use-cases
    this.getUserByEmailUseCase = getUserByEmailUseCase;
    this.updateUserUseCase = updateUserUseCase;
    this.changePasswordUseCase = changePasswordUseCase;
  }

  async login(email, password){
    return await this.loginUseCase.execute(email, password);
  }

  async generateTokens(user){
    return await this.generateTokensUsecase.execute(user);
  }

  async sendEmailConfirmation(email){
    const user = await this.getUserByEmailUseCase.execute(email);
    if(!user) throw boom.notFound('User not found');

    return await this.sendEmailConfirmationUseCase.execute(user);
  }

  async verifyEmailByToken(token){
    return await this.verifyEmailByTokenUseCase.execute(token);
  }

  async activateAccount(user){
    await this.updateUserUseCase.execute(user.id, { isVerified: true, recoveryToken: null });
    return this.generateTokens(user);
  }

  async changePassword(token, newPassword){
    const { user } = await this.verifyEmailByToken(token);
    return await this.changePasswordUseCase.execute(user.id, newPassword);
  }

  validateAccessToken(accessToken){
    const decodedAccessToken = jwt.verify(accessToken, config.jwtAccessSecret);
    return decodedAccessToken;
  }

  validateRefreshToken(refreshToken){
    const decodedRefreshToken = jwt.verify(refreshToken, config.jwtRefreshSecret);
    return decodedRefreshToken;
  }
}

module.exports = AuthService;
