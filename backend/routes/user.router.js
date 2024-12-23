const express = require('express');

const AuthService = require('./../services/auth.service');
const serviceAuth = new AuthService();

const UserService = require('./../services/user.service');
const { validatorHandler } = require('./../middlewares/validator.handler');
const { createUserSchema } = require('./../schemas/user.schema');

const router = express.Router();
const service = new UserService();

router.get('/:email', async (req, res, next) => {
  try {
    const { email } = req.params;
    const cardId = await service.findByEmail(email);
    res.json(cardId);
  } catch (error) {
    next(error);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const users = await service.findAll();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.post('/sign-up',
  validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      if (body.password !== body.confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
      }
      const newUser = await service.create(body);
      const sendEmail = await serviceAuth.sendEmailConfirmation(body.email);
      res.status(201).json({newUser, sendEmail});
    } catch (error) {
      next(error);
    }
  }
);


module.exports = router;
