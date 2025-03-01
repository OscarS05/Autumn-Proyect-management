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
    const response = await this.redis.set(this.refreshTokenKey(userId, refreshToken), refreshToken, 'EX', 15 * 24 * 60 * 60);
    return response;
  }

  async verifyRefreshTokenInRedis(userId, refreshToken) {
    const storedToken = await this.redis.get(this.refreshTokenKey(userId, refreshToken));
    return storedToken;
  }

  async removeRefreshToken(userId, refreshToken) {
    const response = await this.redis.del(this.refreshTokenKey(userId, refreshToken));
    return response;
  }

  async saveTokenInRedis(userId, token){
    await this.redis.set(this.tokenToVerifyEmail(userId, token), token, 'EX', 15 * 60);
  }

  async verifyTokenInRedis(userId, token){
    const storedToken = await this.redis.get(this.tokenToVerifyEmail(userId, token));
    if(storedToken !== token) throw boom.unauthorized();
    return storedToken;
  }

  async removeToken(userId, token){
    await this.redis.del(this.tokenToVerifyEmail(userId, token));
  }
}

module.exports = AuthRedisService;
