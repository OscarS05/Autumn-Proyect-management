const dbRepositories = require('../../../infrastructure/repositories/db/index');

const GetProjectMembersUseCase = require('./GetProjectMembers');

const getProjectMembersUseCase = new GetProjectMembersUseCase(dbRepositories);

module.exports = {
  getProjectMembersUseCase,
}
