const { User, UserSchema } = require('./user.model');
const { WorkspaceMember, WorkspaceMemberSchema } = require('./workspace-member.model');
const { Workspace, WorkspaceSchema } = require('./workspace.model');
const { Team, TeamSchema } = require('./team.model');
const { TeamMember, TeamMemberSchema } = require('./team-member.model');
const { ProjectMember, ProjectMemberSchema } = require('./project-member.model');
const { Project, ProjectSchema } = require('./project.model');
const { List, ListSchema } = require('./list.model');
const { Card, CardSchema } = require('./card.model');

function setupModels(sequelize){
  User.init(UserSchema, User.config(sequelize));
  Workspace.init(WorkspaceSchema, Workspace.config(sequelize));
  WorkspaceMember.init(WorkspaceMemberSchema, WorkspaceMember.config(sequelize));
  Team.init(TeamSchema, Team.config(sequelize));
  TeamMember.init(TeamMemberSchema, TeamMember.config(sequelize));
  Project.init(ProjectSchema, Project.config(sequelize));
  ProjectMember.init(ProjectMemberSchema, ProjectMember.config(sequelize));
  List.init(ListSchema, List.config(sequelize));
  Card.init(CardSchema, Card.config(sequelize));

  User.associate(sequelize.models);
  Workspace.associate(sequelize.models);
  WorkspaceMember.associate(sequelize.models);
  Team.associate(sequelize.models);
  Project.associate(sequelize.models);
  // ProjectMember.associate(sequelize.models);
  List.associate(sequelize.models);
  Card.associate(sequelize.models);
}

module.exports = setupModels;
