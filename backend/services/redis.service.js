const redis = require('../cache/index');
const jwt = require('jsonwebtoken');
const boom = require('@hapi/boom');

const { config } = require('./../config/config');


class RedisService {
  constructor() {}

  async saveRefreshToken(userId, refreshToken) {
    const key = `refresh_token:${userId}:${refreshToken.slice(-10)}`;
    await redis.set(key, refreshToken, 'EX', 15 * 24 * 60 * 60);
  }

  async verifyRefreshTokenInRedis(userId, refreshToken) {
    const key = `refresh_token:${userId}:${refreshToken.slice(-10)}`;
    const storedToken = await redis.get(key);
    if(!storedToken === refreshToken){
      throw boom.unauthorized();
    }
    return storedToken;
  }

  async removeRefreshToken(userId, refreshToken) {
    const key = `refresh_token:${userId}:${refreshToken.slice(-10)}`;
    await redis.del(key);
  }

  async saveTokenInRedis(userId, token){
    const key = `token:${userId}:${token.slice(-10)}`;
    await redis.set(key, token, 'EX', 5 * 60);
  }

  async verifyTokenInRedis(userId, token){
    const key = `token:${userId}:${token.slice(-10)}`;
    return await redis.get(key);
  }

  async removeToken(userId, token){
    const key = `token:${userId}:${token.slice(-10)}`;
    await redis.del(key);
  }
}

module.exports = RedisService;
