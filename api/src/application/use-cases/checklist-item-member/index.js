const dbRepositories = require('../../../infrastructure/repositories/db/index');

const GetAllByProjectMemberUseCase = require('./GetAllByProjectMemberUseCase');

const getAllByProjectMemberUseCase = new GetAllByProjectMemberUseCase(dbRepositories);

module.exports = {
  getAllByProjectMemberUseCase
}
