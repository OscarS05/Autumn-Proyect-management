const express = require('express');
const passport = require('passport');

const { limiter } = require('./../middlewares/auth.handler');
const AuthService = require('./../services/auth.service');
const { config } = require('../config/config');
const service = new AuthService();

const router = express.Router();

router.post('/login',
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user;
      const { accessToken, refreshToken } = service.signToken(user);
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: config.isProd || false,
        sameSite: 'strict',
        path: '/',
        maxAge: 7 * 24 * 60 * 60 * 1000
      });
      res.json({accessToken});
    } catch (error) {
      next(error);
    }
  }
);

router.post('/verify-email',
  async (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      const user = await service.verifyEmail(token);
      const { accessToken, refreshToken } = service.signToken(user);
      console.log('THIS ACCESSTOKEN', accessToken);
      console.log('THIS REFRESHTOKEN', refreshToken);
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: config.isProd || false,
        sameSite: 'strict',
        path: '/',
        maxAge: 7 * 24 * 60 * 60 * 1000
      });
      res.status(200).json({accessToken});
    } catch (error) {
      next(error);
    }
  }
);

router.post('/resend-verification-email',
  limiter(3, 15 * 60 * 100),
  async (req, res, next) => {
    try {
      const { email } = req.body;
      const sendEmail = await service.sendEmailConfirmation(email);
      res.status(200).json(sendEmail);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/refresh-token',
  passport.authenticate('refresh-token', { session: false }),
  async (req, res, next) => {
    try {
      const { refreshToken } = req.cookies;
      const { newAccessToken, newRefreshToken } = await service.generateAccessToken(refreshToken);
      res.cookie('refreshToken', newRefreshToken, {
        httpOnly: true,
        secure: config.isProd || false,
        sameSite: 'strict',
        path: '/',
        maxAge: 7 * 24 * 60 * 60 * 1000
      });
      res.status(200).json({newAccessToken});
    } catch (error) {
      next(error)
    }
  }
);

module.exports = router;
