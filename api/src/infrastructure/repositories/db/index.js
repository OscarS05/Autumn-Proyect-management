const sequelize = require('../../store/db/sequelize');

const UserRepository = require('./user.repository');
const WorkspaceRepository = require('./workspace.repository');
const WorkspaceMemberRepository = require('./workspace-member.repository');
const ProjectRepository = require('./project.repository');
const ProjectMemberRepository = require('./project-member.repository');
const TeamRepository = require('./team.repository');
const TeamMemberRepository = require('./team-member.repository');
const ListRepository = require('./list.repository');
const CardRepository = require('./card.repository');
const CardMemberRepository = require('./card-member.repository');
const LabelRepository = require('./label-repository');
const ChecklistRepository = require('./checklist.repository');

const userRepository = new UserRepository(sequelize);
const workspaceRepository = new WorkspaceRepository(sequelize);
const workspaceMemberRepository = new WorkspaceMemberRepository(sequelize);
const projectRepository = new ProjectRepository(sequelize);
const projectMemberRepository = new ProjectMemberRepository(sequelize);
const teamRepository = new TeamRepository(sequelize);
const teamMemberRepository = new TeamMemberRepository(sequelize);
const listRepository = new ListRepository(sequelize);
const cardRepository = new CardRepository(sequelize);
const cardMemberRepository = new CardMemberRepository(sequelize);
const labelRepository = new LabelRepository(sequelize);
const checklistRepository = new ChecklistRepository(sequelize);

module.exports = {
  userRepository,
  workspaceRepository,
  workspaceMemberRepository,
  projectRepository,
  projectMemberRepository,
  teamRepository,
  teamMemberRepository,
  listRepository,
  cardRepository,
  cardMemberRepository,
  labelRepository,
  checklistRepository
};
