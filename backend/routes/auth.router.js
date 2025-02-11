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
      const user = await service.verifyEmailToActivateAccount(token);
      const { accessToken, refreshToken } = service.signToken(user);
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

router.patch('/change-password',
  validatorHandler(changePassword, 'body'),
  async (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return res.status(401).json({ message: 'No token was found or it has expired. Please try again!' });
      }
      const credentials = req.body;
      const rta = await service.changePassword(token, credentials);
      res.clearCookie('refreshToken', {
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

router.post('/validate-tokens',
  async (req, res, next) => {
    try {
      const accessToken = req.headers.authorization?.split(' ')[1];
      const refreshToken = req.cookies.refreshToken;

      if(!accessToken || !refreshToken){
        return res.status(401).json({ message: "Not authorized" });
      }

      const tokensResponse = await service.validateTokens(accessToken, refreshToken);

      if(tokensResponse.data?.refreshToken){
        res.cookie('refreshToken', tokensResponse.data.refreshToken, {
          httpOnly: true,
          secure: config.env === 'production' ? true : false,
          sameSite: config.env === 'production' ? 'Strict' : 'Lax',
          maxAge: 15 * 24 * 60 * 60 * 1000,
        });
      }

      res.status(tokensResponse.status).json({
        message: tokensResponse.message,
        accessToken: tokensResponse.data?.accessToken || tokensResponse.data || ''
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
