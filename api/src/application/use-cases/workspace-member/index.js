const { workspaceMemberRepository } = require('../../../infrastructure/repositories/db/index');

const GetWorkspaceMemberByUserIdUseCase = require('./getWorkspaceMemberByUserIdUseCase');
const GetWorkspaceMembersUseCase = require('./getWorkspaceMembersUseCase');

const getWorkspaceMemberByUserIdUseCase = new GetWorkspaceMemberByUserIdUseCase(workspaceMemberRepository);
const getWorkspaceMembersUseCase = new GetWorkspaceMembersUseCase(workspaceMemberRepository);

module.exports = {
  getWorkspaceMemberByUserIdUseCase,
  getWorkspaceMembersUseCase,
}
