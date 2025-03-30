const dbRepositories = require('../../../infrastructure/repositories/db/index');

const GetProjectsByWorkspaceMemberUseCase = require('./GetProjectsUseCase');

const getProjectsByWorkspaceMemberUseCase = new GetProjectsByWorkspaceMemberUseCase(dbRepositories);

module.exports = {
  getProjectsByWorkspaceMemberUseCase,
}
