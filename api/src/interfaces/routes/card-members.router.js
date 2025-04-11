const router = require('./card-attachments.router');

const { validateSession } = require('../middlewares/authentication.handler');
const { validatorHandler } = require('../middlewares/validator.handler');
const { checkAdminRoleInProjectByCard, checkProjectMembershipByCard } = require('../middlewares/authorization/card.authorization');
const { cardIdSchema, cardMemberSchema } = require('../schemas/card-member.schema');

const cardMemberControllers = require('../controllers/card-member.controller');

router.get('/:cardId/members',
  validateSession,
  validatorHandler(cardIdSchema, 'params'),
  checkProjectMembershipByCard,
  cardMemberControllers.getAllCardMembers
);

router.post('/:cardId/members/:projectMemberId',
  validateSession,
  validatorHandler(cardMemberSchema, 'params'),
  checkAdminRoleInProjectByCard,
  cardMemberControllers.addMemberToCard
);

router.delete('/:cardId/members/:projectMemberId',
  validateSession,
  validatorHandler(cardMemberSchema, 'params'),
  checkAdminRoleInProjectByCard,
  cardMemberControllers.deleteCardMember
);

module.exports = router;
