const express = require('express');

const userRouter = require('./user.router');
const authRouter = require('./auth.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);

  router.use('/user', userRouter);
  router.use('/auth', authRouter);
}

module.exports = routerApi;
