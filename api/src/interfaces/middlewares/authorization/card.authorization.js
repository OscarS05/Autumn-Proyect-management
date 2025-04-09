const boom = require('@hapi/boom');
const { cardService, cardMemberService } = require('../../../application/services/index');

const validateCardAuthorization = async (req, res, next) => {
  try {
    const userId = req.user.sub;
    const { listId, cardId } = req.params;

    const card = await cardService.checkProjectMemberByCardAndList(userId, listId, cardId);
    if(!card?.id) throw boom.notFound('Something went wrong with data');

    next();
  } catch (error) {
    next(error);
  }
};

const checkAdminRoleInProjectByCard = async (req, res, next) => {
  try {
    const userId = req.user.sub;
    const { cardId, projectMemberId } = req.params;

    const projectMember = await cardService.getProjectMemberByCard(userId, cardId);
    if(!projectMember?.id) throw boom.notFound('Something went wrong with data');
    if(projectMember.role === 'member') throw boom.notFound('Something went wrong with data');

    req.projectMember = projectMember;
    next();
  } catch (error) {
    next(error);
  }
};

const checkProjectMembershipByCard = async (req, res, next) => {
  try {
    const userId = req.user.sub;
    const { cardId, projectMemberId } = req.params;

    const projectMember = await cardService.getProjectMemberByCard(userId, cardId);
    if(!projectMember?.id) throw boom.notFound('Something went wrong with data');

    req.projectMember = projectMember;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  validateCardAuthorization,
  checkAdminRoleInProjectByCard,
  checkProjectMembershipByCard,
}
