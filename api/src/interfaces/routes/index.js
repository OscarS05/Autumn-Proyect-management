const express = require('express');

const userRouter = require('./user.router');
const authRouter = require('./auth.router');
const workspaceRouter = require('./team-member.router');
// const listRouter = require('./list.router');
// const cardRouter = require('./card.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);

  router.use('/users', userRouter);
  router.use('/auth', authRouter);
  router.use('/workspaces', workspaceRouter);
  // router.use('/lists', listRouter);
  // router.use('/cards', cardRouter);
}

module.exports = routerApi;
