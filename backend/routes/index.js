const express = require('express');

const userRouter = require('./user.router');
const authRouter = require('./auth.router');
const workspaceRouter = require('./workspace.router');
const projectRouter = require('./project.router');
const listRouter = require('./list.router');
const cardRouter = require('./card.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);

  router.use('/user', userRouter);
  router.use('/auth', authRouter);
  router.use('/workspace', workspaceRouter);
  router.use('/project', projectRouter);
  router.use('/list', listRouter);
  router.use('/card', cardRouter);
}

module.exports = routerApi;
