const boom = require('@hapi/boom');
const { cardService, listService } = require('../../../application/services/index');

const validateCardAuthorization = async (req, res, next) => {
  try {
    const userId = req.user.sub;
    const { listId, cardId } = req.params;

    const card = await cardService.projectMembershipByCard(userId, listId, cardId);
    if(!card?.id) throw boom.notFound('Something went wrong with data');

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  validateCardAuthorization,
}
