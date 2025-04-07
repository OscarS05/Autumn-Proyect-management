const express = require('express');

const userRouter = require('./user.router');
const authRouter = require('./auth.router');
const workspaceRouter = require('./list.router');
const cardRouter = require('./card.router');
const { cardMemberRouter } = require('./label.router');
const { router: labelRouter } = require('./label.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);

  router.use('/users', userRouter);
  router.use('/auth', authRouter);
  router.use('/workspaces', workspaceRouter);
  router.use('/', cardRouter);
  router.use('/cards', cardMemberRouter);
  router.use('/', labelRouter);
}

module.exports = routerApi;
