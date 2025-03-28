const sequelize = require('../../store/db/sequelize');

const UserRepository = require('./user.repository');
const WorkspaceRepository = require('./workspace.repository');
const WorkspaceMemberRepository = require('./workspace-member.repository');
const ProjectRepository = require('./project.repository');

const userRepository = new UserRepository(sequelize);
const workspaceRepository = new WorkspaceRepository(sequelize);
const workspaceMemberRepository = new WorkspaceMemberRepository(sequelize);
const projectRepository = new ProjectRepository(sequelize);

module.exports = {
  userRepository,
  workspaceRepository,
  workspaceMemberRepository,
  projectRepository,
};
