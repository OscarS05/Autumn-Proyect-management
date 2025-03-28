const dbRepositories = require('../../../infrastructure/repositories/db/index');

const GetProjectsUseCase = require('./GetProjectsUseCase');

const getProjectsUseCase = new GetProjectsUseCase(dbRepositories);

module.exports = {
  getProjectsUseCase,
}
