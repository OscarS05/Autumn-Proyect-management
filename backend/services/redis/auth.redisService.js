const boom = require('@hapi/boom');

const BaseRedisService = require('./base.redisService');


class AuthRedisService extends BaseRedisService {
  constructor(redisClient){
    super(redisClient);
  }

  refreshTokenKey(userId, refreshToken){
    return `refresh_token:${userId}:${refreshToken.slice(-10)}`;
  }

  tokenToVerifyEmail(userId, token){
    return `token:${userId}:${token.slice(-10)}`;
  }

  async saveRefreshToken(userId, refreshToken) {
    try {
      const response = await this.redis.set(this.refreshTokenKey(userId, refreshToken), refreshToken, 'EX', 15 * 24 * 60 * 60);
      if(response !== 'OK') throw boom.badRequest('Failed to save refresh token in Redis');
      return response;
    } catch (error) {
      throw boom.badRequest(error.message || 'Failed to save refresh token in Redis');
    }
  }

  async verifyRefreshTokenInRedis(userId, refreshToken) {
    try {
      const storedToken = await this.redis.get(this.refreshTokenKey(userId, refreshToken));
      if(storedToken == null) throw boom.badRequest('Key does not exist');
      return storedToken;
    } catch (error) {
      throw boom.badRequest(error.message || 'Failed to verify refresh token in Redis');
    }
  }

  async removeRefreshToken(userId, refreshToken) {
    try {
      const response = await this.redis.del(this.refreshTokenKey(userId, refreshToken));
      if(response === 0) throw boom.badRequest('Failed to remove refresh token in Redis (The key might not exist)');
      return response;
    } catch (error) {
      throw boom.badRequest(error.message || 'Failed to remove refresh token in Redis');
    }
  }

  async saveTokenInRedis(userId, token){
    try {
      const result = await this.redis.set(this.tokenToVerifyEmail(userId, token), token, 'EX', 15 * 60);
      if(result !== 'OK') throw boom.badRequest('Failed to save token in Redis');
      return result;
    } catch (error) {
      throw boom.badRequest(error.message || 'Failed to save token in Redis');
    }
  }

  async verifyTokenInRedis(userId, token){
    try {
      const storedToken = await this.redis.get(this.tokenToVerifyEmail(userId, token));
      if(storedToken === null) throw boom.badRequest('Key does not exist');
      if(storedToken !== token) throw boom.unauthorized();
      return storedToken;
    } catch (error) {

    }
  }

  async removeToken(userId, token){
    try {
      const result = await this.redis.del(this.tokenToVerifyEmail(userId, token));
      if(result === 0) throw boom.badRequest('Failed to remove token in Redis. (The key might not exist)');
      return result;
    } catch (error) {
      throw boom.badRequest(error.message || 'Failed to remove token in Redis');
    }
  }
}

module.exports = AuthRedisService;
