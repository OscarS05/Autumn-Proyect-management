const express = require('express');
const passport = require('passport');

const { changePassword } = require('./../schemas/user.schema');
const { validatorHandler } = require('./../middlewares/validator.handler')
const { limiter } = require('./../middlewares/auth.handler');
const AuthService = require('./../services/auth.service');
const { config } = require('../config/config');
const { ValidationError } = require('sequelize');
const service = new AuthService();

const router = express.Router();

router.post('/sign-in',
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      const user = req.body;
      const rememberMe = req.body.rememberMe
      const { accessToken, refreshToken } = service.signToken(user);
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: config.isProd || false,
        sameSite: 'strict',
        path: '/',
        maxAge: rememberMe ? 30 * 24 * 60 * 60 * 1000 : 7 * 24 * 60 * 60 * 1000,
      });
      res.status(200).json({accessToken});
    } catch (error) {
      next(error);
    }
  }
);

router.post('/verify-email',
  async (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      const user = await service.verifyEmailToActivateAccount(token);
      const { accessToken, refreshToken } = service.signToken(user);
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

router.post('/verify-email-to-recover-password',
  async (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      const user = await service.verifyEmail(token);
      if(user.recoveryToken !== token){
        res.status(401).json({ message: 'Invalid or expired token.' });
      }
      res.status(200).json({message: 'Email verified successfully', token});
    } catch (error) {
      next(error);
    }
  }
);

router.post('/change-password',
  validatorHandler(changePassword, 'body'),
  async (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return res.status(401).json({ message: 'No token was found or it has expired. Please try again!' });
      }
      const credentials = req.body;
      const rta = await service.changePassword(token, credentials);
      return res.json(rta);
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
      if (error?.message === 'Too many email requests, please try again after an 15 minutes') {
        return res.status(429).json({ message: error.message });
      }
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
