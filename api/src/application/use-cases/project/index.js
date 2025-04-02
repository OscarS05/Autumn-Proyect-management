const dbRepositories = require('../../../infrastructure/repositories/db/index');

const GetProjectUseCase = require('./GetProjectUseCase');
const GetProjectsByWorkspaceMemberUseCase = require('./GetProjectsByWorkspaceMemberUseCase');
const GetProjectsByWorkspaceUseCase = require('./GetProjectsByWorkspaceUseCase');
const CountProjectsUseCase = require('./CountProjectsUseCase');
const CreateProjectUseCase = require('./CreateProjectUseCase');
const UpdateProjectUseCase = require('./UpdateProjectUseCase');
const DeleteProjectUseCase = require('./DeleteProjectUseCase');

const getProjectUseCase = new GetProjectUseCase(dbRepositories);
const getProjectsByWorkspaceMemberUseCase = new GetProjectsByWorkspaceMemberUseCase(dbRepositories);
const getProjectsByWorkspaceUseCase = new GetProjectsByWorkspaceUseCase(dbRepositories);
const countProjectsUseCase = new CountProjectsUseCase(dbRepositories);
const createProjectUseCase = new CreateProjectUseCase(dbRepositories);
const updateProjectUseCase = new UpdateProjectUseCase(dbRepositories);
const deleteProjecUseCase = new DeleteProjectUseCase(dbRepositories);

module.exports = {
  getProjectUseCase,
  getProjectsByWorkspaceMemberUseCase,
  getProjectsByWorkspaceUseCase,
  countProjectsUseCase,
  createProjectUseCase,
  updateProjectUseCase,
  deleteProjecUseCase,
}
