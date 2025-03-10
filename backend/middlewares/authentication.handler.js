const boom = require('@hapi/boom');
const { rateLimit } = require('express-rate-limit');
const jwt = require('jsonwebtoken');

const { config } = require('../config/config');

const { AuthRedis } = require('../services/redis/index');
const { authService } = require('../services/db/index');


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
        const isValidRefreshTokenInRedis = await AuthRedis.verifyRefreshTokenInRedis(decodedRefreshToken.sub, refreshToken);
        if(!isValidRefreshTokenInRedis){
          return next(boom.unauthorized());
        }
        if(isValidRefreshTokenInRedis !== refreshToken){
          return next(boom.unauthorized());
        }

        await AuthRedis.removeRefreshToken(decodedRefreshToken.sub, refreshToken);

        const user = {
          sub: decodedRefreshToken.sub,
          role: decodedRefreshToken.role
        }

        const newTokens = await authService.signToken(user);

        req.user = user;
        req.tokens = newTokens;
        res.cookie('refreshToken', newTokens.refreshToken, {
          httpOnly: true,
          secure: config.env === 'production' ? true : false,
          sameSite: config.env === 'production' ? 'Strict' : 'Lax',
          maxAge: 15 * 24 * 60 * 60 * 1000,
        });
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
