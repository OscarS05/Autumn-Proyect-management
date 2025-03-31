const dbRepositories = require('../../../infrastructure/repositories/db/index');

const GetProjectMembersOfWorkspaceMemberUseCase = require('./GetProjectMembersOfWorkspaceMemberUseCase');
const GetProjectMemberByWorkspaceMemberUseCase = require('./GetProjectMemberByWorkspaceMemberUseCase');
const GetProjectMembersByWorkspaceUseCase = require('./GetProjectMembersByWorkspaceUseCase');

const getProjectMembersOfWorkspaceMemberUseCase = new GetProjectMembersOfWorkspaceMemberUseCase(dbRepositories);
const getProjectMemberByWorkspaceMemberUseCase = new GetProjectMemberByWorkspaceMemberUseCase(dbRepositories);
const getProjectMembersByWorkspaceUseCase = new GetProjectMembersByWorkspaceUseCase(dbRepositories);

module.exports = {
  getProjectMembersOfWorkspaceMemberUseCase,
  getProjectMemberByWorkspaceMemberUseCase,
  getProjectMembersByWorkspaceUseCase,
}
