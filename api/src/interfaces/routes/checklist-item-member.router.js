const express = require('express');
const router = express.Router();

const { validateSession } = require('../middlewares/authentication.handler');
const { validatorHandler } = require('../middlewares/validator.handler');
const { checkProjectMembershipByChecklist } = require('../middlewares/authorization/card.authorization');
const { checklistItemMemberSchema, checklistItemSchema, addMemberToItemSchema } = require('../schemas/checklist-item-member.schema');

const checklistItemControllers = require('../controllers/checklist-item-member.controller');

router.get('/:checklistId/checklist-items/:checklistItemId/members',
  validateSession,
  validatorHandler(checklistItemSchema, 'params'),
  checkProjectMembershipByChecklist,
  checklistItemControllers.getAllChecklistItemMembers
);

router.post('/:checklistId/checklist-items/:checklistItemId/members',
  validateSession,
  validatorHandler(checklistItemSchema, 'params'),
  validatorHandler(addMemberToItemSchema, 'body'),
  checkProjectMembershipByChecklist,
  checklistItemControllers.addMemberToChecklistItem
);

router.delete('/:checklistId/checklist-items/:checklistItemId/members/:projectMemberId',
  validateSession,
  validatorHandler(checklistItemMemberSchema, 'params'),
  checkProjectMembershipByChecklist,
  checklistItemControllers.deleteChecklistItemMember
);

module.exports = router;
