const express = require('express');
const passport = require('passport');
const boom = require('@hapi/boom');

const { changePassword } = require('./../schemas/user.schema');

const { validatorHandler } = require('./../middlewares/validator.handler')
const { limiter, validateSession } = require('./../middlewares/auth.handler');

const { ValidationError } = require('sequelize');
const { config } = require('../config/config');

const AuthService = require('./../services/auth.service');
const service = new AuthService();
const RedisService = require('../services/redis.service');
const redisService = new RedisService();

const router = express.Router();

router.post('/sign-in',
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user;
      const { accessToken, refreshToken } = await service.signToken(user);
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: config.env === 'production' ? true : false,
        sameSite: config.env === 'production' ? 'Strict' : 'Lax',
        maxAge: 15 * 24 * 60 * 60 * 1000,
      });
      res.status(200).json({accessToken});
    } catch (error) {
      next(error);
    }
  }
);

router.post('/logout', async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    const accessToken = req.headers.authorization?.split(' ')[1];

    if (!accessToken || !refreshToken) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const decodedAccessToken = service.validateAccessToken(accessToken);
    await service.logout(decodedAccessToken.sub, refreshToken);

    res.clearCookie('refreshToken');
    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    next(error);
  }
});

router.post('/verify-email',
  async (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      const tokenInCookies = req.cookies.verifyEmail;

      if(!token || !tokenInCookies) return res.status(401).json({ message: 'Unauthorized' });
      if(tokenInCookies !== token){
        throw boom.unauthorized();
      }

      const user = await service.verifyEmailToActivateAccount(token);
      const tokens = await service.signToken(user);

      res.cookie('refreshToken', tokens.refreshToken, {
        httpOnly: true,
        secure: config.env === 'production' ? true : false,
        sameSite: config.env === 'production' ? 'Strict' : 'Lax',
        maxAge: 15 * 24 * 60 * 60 * 1000,
      });
      res.clearCookie('verifyEmail', {
        httpOnly: true,
        secure: config.env === 'production',
        sameSite: config.env === 'production' ? 'Strict' : 'Lax',
      });

      res.status(200).json({ accessToken: tokens.accessToken });
    } catch (error) {
      next(error);
    }
  }
);

router.post('/verify-email-to-recover-password',
  async (req, res, next) => {
    try {
      const tokenInParams = req.headers.authorization?.split(' ')[1];
      const token = req.cookies.verifyEmail;
      if (!token || !tokenInParams) {
        return res.status(401).json({ message: 'Unuthorized' });
      }
      const user = await service.verifyEmail(tokenInParams);
      const tokenInRedis = await redisService.verifyTokenInRedis(user.id, token);

      if(tokenInRedis !== tokenInParams){
        return res.status(401).json({ message: 'Invalid or expired token.' });
      }
      res.status(200).json({ message: 'Email verified successfully' });
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/change-password',
  validatorHandler(changePassword, 'body'),
  async (req, res, next) => {
    try {
      const token = req.cookies.verifyEmail;
      if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      const credentials = req.body;
      const rta = await service.changePassword(token, credentials);

      res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: config.env === 'production',
        sameSite: config.env === 'production' ? 'Strict' : 'Lax',
      });
      res.clearCookie('verifyEmail', {
        httpOnly: true,
        secure: config.env === 'production',
        sameSite: config.env === 'production' ? 'Strict' : 'Lax',
      });

      return res.json(rta);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/send-verification-email',
  limiter(3, 15 * 60 * 100),
  async (req, res, next) => {
    try {
      const { email } = req.body;

      const { send, token } = await service.sendEmailConfirmation(email);

      if(token){
        res.cookie('verifyEmail', token, {
          httpOnly: true,
          secure: config.env === 'production' ? true : false,
          sameSite: config.env === 'production' ? 'Strict' : 'Lax',
          maxAge: 15 * 60 * 1000,
        });
      }
      res.status(200).json({ message: 'The verification email was sent successfully!' });
    } catch (error) {
      if (error?.message === 'Too many email requests, please try again after an 15 minutes') {
        return res.status(429).json({ message: error.message });
      }
      next(error);
    }
  }
);

router.post('/resend-verification-email',
  limiter(3, 15 * 60 * 100),
  async (req, res, next) => {
    try {
      const tokenToVerifyEmail = req.cookies.verifyEmail;

      if(!tokenToVerifyEmail){
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const user = await service.verifyEmail(tokenToVerifyEmail);
      const userEmail = user.dataValues?.email || user.email;

      const { send, token } = await service.sendEmailConfirmation(userEmail);

      if(token){
        res.cookie('verifyEmail', token, {
          httpOnly: true,
          secure: config.env === 'production' ? true : false,
          sameSite: config.env === 'production' ? 'Strict' : 'Lax',
          maxAge: 15 * 60 * 1000,
        });
      }
      res.status(200).json({ message: 'The verification email was sent successfully!' });
    } catch (error) {
      if (error?.message === 'Too many email requests, please try again after an 15 minutes') {
        return res.status(429).json({ message: error.message });
      }
      next(error);
    }
  }
);

router.post('/validate-session',
  validateSession,
  async (req, res, next) => {
    try {
      const { accessToken, refreshToken } = req.tokens || null;

      res.status(200).json({
        message: 'Session is valid',
        accessToken: accessToken || ''
      });
    } catch (error) {
      next(error);
    }
  }
)

router.post('/validate-tokens-to-verify-email',
  async (req, res, next) => {
    try {
      const token = req.cookies.verifyEmail;

      if(!token){
        return res.status(401).json({ message: "Not authorized" });
      }

      const isTheTokenValid = await service.verifyTokensToVerifyEmail(token);

      if(!isTheTokenValid){
        return res.status(401).json({ message: "Invalid token" });
      }

      res.status(200).json({ message: 'Valid token' });
    } catch (error) {
      next(error);
    }
  }
)

module.exports = router;
