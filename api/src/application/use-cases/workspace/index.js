const dbRepositories = require('../../../infrastructure/repositories/db/index');
const redisModels = require('../../../infrastructure/repositories/cache/index');

const CreateWorkspaceUseCase = require('./createWorkspaceUseCase');
const UpdateWorkspaceUseCase = require('./updateWorkspaceUseCase');
const DeleteWorkspaceUseCase = require('./deleteWorkspaceUseCase');
const GetWorkspacesAndProjectsUseCase = require('./getWorkspacesAndProjectsUseCase');
const CountWorkspacesByUserUseCase = require('./countWorkspacesByUserUseCase');

const createWorkspaceUseCase = new CreateWorkspaceUseCase(dbRepositories, redisModels);
const updateWorkspaceUseCase = new UpdateWorkspaceUseCase(dbRepositories);
const deleteWorkspaceUseCase = new DeleteWorkspaceUseCase(dbRepositories, redisModels);
const getWorkspacesAndProjectsUseCase = new GetWorkspacesAndProjectsUseCase(dbRepositories, redisModels);
const countWorkspacesByUserUseCase = new CountWorkspacesByUserUseCase(dbRepositories);

module.exports = {
  createWorkspaceUseCase,
  updateWorkspaceUseCase,
  deleteWorkspaceUseCase,
  getWorkspacesAndProjectsUseCase,
  countWorkspacesByUserUseCase,
};
