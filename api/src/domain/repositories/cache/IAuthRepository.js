const boom = require('@hapi/boom');

class IAuthRepository {
  async saveRefreshToken(userId, refreshToken) {
    throw boom.notImplemented('The saveRefreshToken() method is not implemented');
  }

  async verifyTokenInRedis(userId, refreshToken) {
    throw boom.notImplemented('The verifyTokenInRedis() method is not implemented');
  }

  async removeRefreshToken(userId, refreshToken) {
    throw boom.notImplemented('The removeRefreshTokens() method is not implemented');
  }

  async saveTokenInRedis(userId, token){
    throw boom.notImplemented('The saveTokenInRedis() method is not implemented');
  }

  async verifyTokenInRedis(userId, token){
    throw boom.notImplemented('The verifyTokenInRedis() method is not implemented');
  }

  async removeToken(userId, token){
    throw boom.notImplemented('The removeToken() method is not implemented');
  }
}

module.exports = IAuthRepository;
