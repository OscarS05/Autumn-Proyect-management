const express = require('express');

const userRouter = require('./user.router');
const authRouter = require('./auth.router');
const workspaceRouter = require('./list.router');
const listRouter = require('./card.router');
const { cardRouter, labelRouter } = require('./checklist.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);

  router.use('/users', userRouter);
  router.use('/auth', authRouter);
  router.use('/workspaces', workspaceRouter);
  router.use('/', listRouter);
  router.use('/cards', cardRouter);
  router.use('/', labelRouter);
}

module.exports = routerApi;
