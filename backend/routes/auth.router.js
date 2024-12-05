const express = require('express');
const passport = require('passport');

const { limiter } = require('./../middlewares/auth.handler');
const AuthService = require('./../services/auth.service');
const service = new AuthService();

const router = express.Router();

router.post('/verify-email',
  async (req, res, next) => {
    try {
      const { token } = req.body;
      const rta = await service.verifyEmail(token);
      res.status(200).json(rta);
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

module.exports = router;
