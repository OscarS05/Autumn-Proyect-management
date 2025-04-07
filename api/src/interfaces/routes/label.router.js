const express = require('express');
const router = express.Router();

const cardMemberRouter = require('./card-members.router');

const { validateSession } = require('../middlewares/authentication.handler');
const { validatorHandler } = require('../middlewares/validator.handler');
const { checkProjectMembershipByUserId } = require('../middlewares/authorization/project.authorization');
const { checkProjectMembershipByCard } = require('../middlewares/authorization/card.authorization');
const { createLabelSchema, projectIdSchema, projectLabelScheme, labelIdSchema, cardIdSchema, updateLabelSchema, updateVisibility, labelVisibilitySchema } = require('../schemas/label.schema');

const labelControllers = require('../controllers/label.controller');

router.get('/projects/:projectId/labels',
  validateSession,
  validatorHandler(projectIdSchema, 'params'),
  checkProjectMembershipByUserId,
  labelControllers.getAllLabels,
);

router.post('/projects/:projectId/cards/:cardId/labels',
  validateSession,
  validatorHandler(projectLabelScheme, 'params'),
  validatorHandler(createLabelSchema, 'body'),
  checkProjectMembershipByUserId,
  labelControllers.createLabel
);

router.patch('/projects/:projectId/labels/:labelId',
  validateSession,
  validatorHandler(labelIdSchema, 'params'),
  validatorHandler(updateLabelSchema, 'body'),
  checkProjectMembershipByUserId,
  labelControllers.updateLabel
);

router.delete('/projects/:projectId/labels/:labelId',
  validateSession,
  validatorHandler(labelIdSchema, 'params'),
  checkProjectMembershipByUserId,
  labelControllers.deleteLabel
);

cardMemberRouter.get('/:cardId/labels/visibility',
  validateSession,
  validatorHandler(cardIdSchema, 'params'),
  checkProjectMembershipByCard,
  labelControllers.getLabelsByCard,
);

cardMemberRouter.patch('/:cardId/labels/:labelId/visibility',
  validateSession,
  validatorHandler(labelVisibilitySchema, 'params'),
  validatorHandler(updateVisibility, 'body'),
  checkProjectMembershipByCard,
  labelControllers.updateLabelVisibilityInCard
);

module.exports = { router, cardMemberRouter };
