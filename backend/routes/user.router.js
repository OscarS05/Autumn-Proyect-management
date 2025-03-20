const express = require('express');
const router = express.Router();

const { validatorHandler } = require('../middlewares/validator.handler');
const { createUserSchema } = require('../schemas/user.schema');
const { config } = require('../config/config');

const { userService, authService } = require('../services/db/index');

router.get('/:email', async (req, res, next) => {
  try {
    const { email } = req.params;
    const cardId = await userService.findByEmail(email);
    res.json(cardId);
  } catch (error) {
    next(error);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const users = await userService.findAll();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.post('/',
  validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      if (body.password !== body.confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
      }
      const newUser = await userService.create(body);
      const { send, token } = await authService.sendEmailConfirmation(body.email);
      if(token){
        res.cookie('verifyEmail', token, {
          httpOnly: true,
          secure: config.env === 'production' ? true : false,
          sameSite: config.env === 'production' ? 'Strict' : 'Lax',
          maxAge: 15 * 60 * 1000,
        });
      }
      res.status(201).json({user: newUser, send: send});
    } catch (error) {
      next(error);
    }
  }
);


module.exports = router;
