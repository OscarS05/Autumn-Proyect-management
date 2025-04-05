const dbRepositories = require('../../../infrastructure/repositories/db/index');

const GetAllUseCase = require('./GetAllUseCase');
const GetCardUseCase = require('./GetCardUseCase');
const CheckProjectMembershipByCardUseCase = require('./CheckProjectMembershipByCardUseCase');
const CreateCardUseCase = require('./CreateCardUseCase');
const UpdateCardUseCase = require('./UpdateCardUseCase');
const DeleteCardUseCase = require('./DeleteCardUseCase');

const getAllUseCase = new GetAllUseCase(dbRepositories);
const getCardUseCase = new GetCardUseCase(dbRepositories);
const checkProjectMembershipByCardUseCase = new CheckProjectMembershipByCardUseCase(dbRepositories);
const createCardUseCase = new CreateCardUseCase(dbRepositories);
const updateCardUseCase = new UpdateCardUseCase(dbRepositories);
const deleteCardUseCase = new DeleteCardUseCase(dbRepositories);

module.exports = {
  getAllUseCase,
  getCardUseCase,
  checkProjectMembershipByCardUseCase,
  createCardUseCase,
  updateCardUseCase,
  deleteCardUseCase,
};
