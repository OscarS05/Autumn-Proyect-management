const dbRepositories = require('../../../infrastructure/repositories/db/index');

const GetAllChecklistsByCardUseCase = require('./GetAllChecklistsByCardUseCase');
const GetAllChecklistsByProjectUseCase = require('./GetAllChecklistsByProjectUseCase');
const CreateChecklistUseCase = require('./CreateChecklistUseCase');
const UpdateChecklistUseCase = require('./UpdateChecklistUseCase');
const DeleteChecklistUseCase = require('./DeleteChecklistUseCase');

const getAllChecklistsByCardUseCase = new GetAllChecklistsByCardUseCase(dbRepositories);
const getAllChecklistsByProjectUseCase = new GetAllChecklistsByProjectUseCase(dbRepositories);
const createChecklistUseCase = new CreateChecklistUseCase(dbRepositories);
const updateChecklistUseCase = new UpdateChecklistUseCase(dbRepositories);
const deleteChecklistUseCase = new DeleteChecklistUseCase(dbRepositories);

module.exports = {
  getAllChecklistsByCardUseCase,
  getAllChecklistsByProjectUseCase,
  createChecklistUseCase,
  updateChecklistUseCase,
  deleteChecklistUseCase,
}
