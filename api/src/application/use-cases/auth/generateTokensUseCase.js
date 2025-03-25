const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');

const { config } = require('../../../../config/config');

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

    await this.AuthRedis.saveRefreshToken(payload.sub, refreshToken);

    return { accessToken, refreshToken };
  }
}

module.exports = GenerateTokensUseCase;
