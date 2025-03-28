const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');

const { config } = require('../../../../config/config');
const logger = require('../../../../utils/logger/logger');

class GenerateTokensUseCase {
  constructor({ AuthRedis }){
    this.AuthRedis = AuthRedis;
  }

  async execute(user){
    if(!user) throw boom.badRequest('User not provided');

    const payload = {
      sub: user.id || user.sub,
      role: user.role
    };

    const accessToken = jwt.sign(payload, config.jwtAccessSecret, { expiresIn: '15m' });
    const refreshToken = jwt.sign(payload, config.jwtRefreshSecret, { expiresIn: '15d' });

    try {
      await this.AuthRedis.saveAccessToken(payload.sub, accessToken);
      await this.AuthRedis.saveRefreshToken(payload.sub, refreshToken);
    } catch (error) {
      logger.warn('❗Failed to save workspaces and projects in Redis by error: ', error);
    }

    return { accessToken, refreshToken };
  }
}

module.exports = GenerateTokensUseCase;
