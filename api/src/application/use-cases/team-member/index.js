const dbRepositories  = require('../../../infrastructure/repositories/db/index');

const GetTeamMembersByIdUseCase = require('./GetTeamMembersByIdUseCase');
const GetTeamMemberUseCase = require('./GetTeamMemberUseCase');

const getTeamMembersByIdUseCase = new GetTeamMembersByIdUseCase(dbRepositories);
const getTeamMemberUseCase = new GetTeamMemberUseCase(dbRepositories);

module.exports = {
  getTeamMembersByIdUseCase,
  getTeamMemberUseCase,
}
