const boom = require('@hapi/boom');

class IAuthCacheRepository {
  async saveRefreshToken(userId, refreshToken) {
    throw boom.notImplemented('The saveRefreshToken() method is not implemented');
  }

  async verifyTokenInRedis(userId, refreshToken) {
    throw boom.notImplemented('The verifyTokenInRedis() method is not implemented');
  }

  async removeRefreshToken(userId, refreshToken) {
    throw boom.notImplemented('The removeRefreshTokens() method is not implemented');
  }

  async saveAccessToken(userId, accessToken) {
    throw boom.notImplemented('The saveAccessToken() method is not implemented');
  }

  async verifyAccessTokenInRedis(userId, accessToken) {
    throw boom.notImplemented('The verifyAccessTokenInRedis() method is not implemented');
  }

  async removeAccessToken(userId, accessToken) {
    throw boom.notImplemented('The saveAccessToken() method is not implemented');
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

module.exports = IAuthCacheRepository;
