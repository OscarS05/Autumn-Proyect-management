const boom = require('@hapi/boom');
const { rateLimit } = require('express-rate-limit');
const jwt = require('jsonwebtoken');

const { config } = require('./../config/config');

const RedisService = require('./../services/redis.service');
const redisService = new RedisService();
const AuthService = require('./../services/auth.service');
const authService = new AuthService();

const limiter = (limit, windowMs) => rateLimit( {
  windowMs: windowMs, // 15 minutes = 15 * 60 * 1000
  limit: limit,
  message: 'Too many email requests, please try again after an 15 minutes',
  standardHeaders: true,
  legacyHeaders: false,
});

async function validateSession(req, res, next) {
  const accessToken = req.headers.authorization?.split(' ')[1];
  const refreshToken = req.cookies.refreshToken;

  if(!accessToken || !refreshToken){
    return next(boom.unauthorized());
  }

  try {
    const decodedAccessToken = jwt.verify(accessToken, config.jwtAccessSecret);

    if(decodedAccessToken){
      req.user = decodedAccessToken;
      req.tokens = { accessToken };
      return next();
    }
  } catch (accessError) {
    if(accessError.name === 'TokenExpiredError'){
      try {
        const decodedRefreshToken = jwt.verify(refreshToken, config.jwtRefreshSecret);
        const isValidRefreshTokenInRedis = await redisService.verifyRefreshTokenInRedis(decodedRefreshToken.sub, refreshToken);

        if(!isValidRefreshTokenInRedis){
          return next(boom.unauthorized());
        }

        await redisService.removeRefreshToken(decodedRefreshToken.sub, refreshToken);

        const user = {
          id: decodedRefreshToken.sub,
          role: decodedRefreshToken.role
        }

        const newTokens = await authService.signToken(user);

        req.user = user;
        req.tokens = newTokens;
        return next();
      } catch (refreshError) {
        return next(boom.unauthorized());
      }
    } else {
      return next(boom.unauthorized());
    }
  }
}


module.exports = { limiter, validateSession };
