const boom = require("@hapi/boom");

class ProjectMemberService {
  constructor(sequelize, models, redisModels, projectService){
    this.sequelize = sequelize;
    this.models = models;
    this.redisModels = redisModels;
    this.projectService = projectService;
  }

  async addProjectMemberController(projectId, workspaceMemberId){
    try {
      const workspaceMember = await this.models.WorkspaceMember.findOne({
        where: { id: workspaceMemberId },
        include: [{
          model: this.models.Workspace,
          as: 'workspace',
          required: true,
          attributes: ['id', 'name'],
          include: [{
            model: this.models.Project,
            as: 'project',
            where: { id: projectId },
            required: true,
            attributes: ['id', 'workspaceId']
          }]
        }],
        attributes: ['id', 'workspaceId'],
      });
      if(!workspaceMember) throw boom.conflict('Workspace member ID does not exist or is not part of the workspace');

      const isMember = await this.models.ProjectMember.findOne({
        where: { projectId, workspaceMemberId }
      });
      if(isMember) throw boom.conflict('Workspace member is already part of this project');


      const addedMember = await this.addProjectMember(projectId, workspaceMemberId);

      return addedMember?.dataValues || '';
    } catch (error) {
      throw boom.badRequest(error.message || 'Failed to add member to project');
    }
  }

  async addProjectMember(projectId, workspaceMemberId){
    try {
      const addedMember = await this.models.ProjectMember.create(
        { workspaceMemberId, role: 'member', propertyStatus: 'guest', projectId }
      );
      if(!addedMember) throw boom.badRequest('Something went wrong while adding a project member');

      await this.redisModels.ProjectMemberRedis.saveProjectMember(
        addedMember.projectId,
        workspaceMemberId
      );

      return addedMember;
    } catch (error) {
      throw boom.badRequest(error.message || 'Failed to add member to project');
    }
  }

  async changeRole(projectId, projectMemberId, newRole){
    try {
      const [updatedRows, [updatedProjectMember]] = await this.models.ProjectMember.update(
        { role: newRole },
        { where: { id: projectMemberId, projectId }, returning: true }
      );
      if(updatedRows === 0) throw boom.badRequest('Failed to update role');

      return updatedProjectMember.dataValues;
    } catch (error) {
      throw boom.badRequest(error.message || 'Failed to change role');
    }
  }

  async roleChangeController(projectId, projectMemberId, newRole){
    try {
      const memberStatus = await this.getProjectMemberById(projectId, projectMemberId);
      if(memberStatus.propertyStatus === 'owner') throw boom.forbidden("You cannot change the owner's role");
      if(memberStatus.role === newRole) throw boom.conflict('The member already has this role');

      const updatedMember = await this.changeRole(projectId, projectMemberId, newRole);
      return updatedMember;
    } catch (error) {
      throw boom.badRequest(error.message || 'Failed to change role');
    }
  }

  async transferOwnership(projectId, currentOwnerId, newOwnerId){
    const transaction = await this.sequelize.transaction();
    try {
      const project = await this.models.Project.findOne({
        where: { id: projectId, workspaceMemberId: currentOwnerId },
        include: {
          model: this.models.WorkspaceMember,
          as: 'members',
          attributes: ['id', 'role', 'propertyStatus'],
          where: { id: newOwnerId },
          required: false
        }
      });
      if(!project) throw boom.badRequest('Project not found');
      if(project.members.length === 0) throw boom.badRequest('New owner is incorrect');

      const [ updatedRows, [updatedProject] ] = await this.models.Project.update(
        { workspaceMemberId: newOwnerId },
        { where: { id: projectId }, returning: true, transaction },
      );
      if(updatedRows === 0){
        throw boom.badRequest('Failed to update owner in project');
      }

      await Promise.all([
        this.models.ProjectMember.update(
          { role: 'admin', propertyStatus: 'owner' },
          { where: { projectId, workspaceMemberId: newOwnerId }, transaction }
        ),
        this.models.ProjectMember.update(
          { role: 'member', propertyStatus: 'guest' },
          { where: { projectId, workspaceMemberId: currentOwnerId }, transaction }
        ),
      ]);

      await transaction.commit();
      await this.redisModels.ProjectRedis.updateProject(updatedProject);
      return updatedProject;
    } catch (error) {
      await transaction.rollback();
      throw boom.badRequest(error.message || 'Failed to transfer ownership');
    }
  }

  async deleteMember(projectId, projectMemberId){
    try {
      const removedMember = await this.models.ProjectMember.destroy(
        { where: { projectId, id: projectMemberId } }
      );

      return removedMember;
    } catch (error) {
      throw boom.badRequest(error.message || 'Failed to remove member');
    }
  }

  async removeMemberController(projectId, projectMemberId, requesterData){
    try {
      const memberTobeRemoved = await this.getProjectMemberById(projectId, projectMemberId);
      if(memberTobeRemoved == null) throw boom.badRequest('The project member you want to delete does not exist in the project');
      if(memberTobeRemoved.propertyStatus === 'owner') throw boom.forbidden("You cannot remove the owner");
      if(memberTobeRemoved.id === requesterData.id) throw boom.forbidden("You cannot remove yourself");

      const removedMember = await this.deleteMember(projectId, projectMemberId);
      if(removedMember === 0) throw boom.badRequest('Member not found or already removed');

      await this.redisModels.ProjectMemberRedis.deleteProjectMember(projectId, memberTobeRemoved.workspaceMemberId);

      return removedMember;
    } catch (error) {
      throw boom.badRequest(error.message || 'Unexpected error while removing member');
    }
  }

  async leaveTheProject(projectId, requesterData){
      try {
        if(requesterData.propertyStatus === 'owner'){
          const removedOwner = await this.handleOwnerExit(projectId, requesterData);
          return removedOwner;
        } else {
          const removedMember = await this.deleteMember(projectId, requesterData.id);
          if(removedMember === 0) throw boom.badRequest('Member not found or already removed');

          await this.redisModels.ProjectMemberRedis.deleteProjectMember(projectId, requesterData.workspaceMemberId);
          return removedMember;
        }
      } catch (error) {
        throw boom.badRequest(error.message || 'Unexpected error while leaving the workspace');
      }
  }

  async handleOwnerExit(projectId, requesterData){
    try {
      const [ workspaceId, projectMembers ] = await Promise.all([
        this.projectService.findProjectWorkspace(projectId),
        this.getProjectMembers(projectId),
      ]);

      if(projectMembers.length === 1 && projectMembers[0].propertyStatus === 'owner'){
        const removedWorkspace = await this.projectService.delete(projectId, workspaceId, requesterData.workspaceMemberId, requesterData.id);
        return removedWorkspace;
      } else if(projectMembers.length > 1){
        const { admins, members } = projectMembers.reduce((acc, member) => {
          if(member.propertyStatus !== 'owner'){
            if(member.role === 'admin'){
              acc.admins.push(member);
            } else if(member.role === 'member'){
              acc.members.push(member);
            }
          }
          return acc;
        }, { admins: [], members: [] });

        if(admins.length > 0){
          await this.transferOwnership(projectId, requesterData.workspaceMemberId, admins[0].workspaceMemberId);
        } else if(members.length > 0){
          await Promise.all([
            this.changeRole(projectId, members[0].id, 'admin'),
            this.transferOwnership(projectId, requesterData.workspaceMemberId, members[0].workspaceMemberId),
          ]);
        }
        const removedOwner = await this.deleteMember(projectId, requesterData.id);
        if(removedOwner === 0) throw boom.badRequest('Member not found or already removed');

        await this.redisModels.ProjectMemberRedis.deleteProjectMember(projectId, requesterData.workspaceMemberId);
        return removedOwner;
      }
    } catch (error) {
      throw boom.badRequest(error.message || 'Unexpected error while removing the owner');
    }
  }

  async getProjectMembers(projectId){
    try {
      const projectMembers = await this.models.ProjectMember.findAll(
        { where: { projectId } }
      );

      return projectMembers;
    } catch (error) {
      throw boom.badRequest(error.message || 'Failed to find project members');
    }
  }

  async getProjectWithItsRelations(projectId){
    try {
      const projectMembers = await this.models.Project.findOne({
          where: { id: projectId },
          include: [
            {
              model: this.models.ProjectMember,
              as: 'projectMembers',
              include: [{
                model: this.models.WorkspaceMember,
                as: 'workspaceMember',
                attributes: ['id', 'userId'],
                include: [{
                  model: this.models.User,
                  as: 'user',
                  attributes: ['id', 'name'],
                }]
              }]
            },
            {
              model: this.models.Team,
              as: 'teams',
              attributes: ['id', 'name', 'workspaceId'],
              include: [{
                model: this.models.TeamMember,
                as: 'teamMembers',
                include: [{
                  model: this.models.WorkspaceMember,
                  as: 'workspaceMember',
                  attributes: ['id', 'userId'],
                  include: [{
                    model: this.models.User,
                    as: 'user',
                    attributes: ['id', 'name'],
                  }]
                }]
              }],
              through: { attributes: [] }
            }
          ],
          attributes: ['id', 'name', 'workspaceId'],
        }
      );

      return projectMembers;
    } catch (error) {
      throw boom.badRequest(error.message || 'Failed to find project members');
    }
  }

  async controllerGetProjectMembers(projectId){
    try {
      const project = await this.getProjectWithItsRelations(projectId);

      const formattedProjectMembers = project.projectMembers.map(projectMember => {
        return {
          id: projectMember.id,
          name: projectMember.workspaceMember.user.name,
          workspaceMemberId: projectMember.workspaceMember.id,
          projectId: projectMember.projectId,
          role: projectMember.role,
          propertyStatus: projectMember.propertyStatus,
          teams: project.teams
            .filter(team => team.teamMembers.some(teamMember => teamMember.workspaceMemberId === projectMember.workspaceMemberId))
            .map(team => ({
              id: team.id,
              name: team.name,
            }))
        }
      });
      const formattedTeams = project.teams.map(team => {
        return {
          id: team.id,
          name: team.name,
          members: team.teamMembers.map(teamMember => {
            return {
              id: teamMember.workspaceMember.id,
              name: teamMember.workspaceMember.user.name,
              role: teamMember.role,
              propertyStatus: teamMember.propertyStatus,
              isMemberProject: project.projectMembers.some(projectMember => projectMember.workspaceMemberId === teamMember.workspaceMemberId)
            }
          })
        }
      });

      return { projectMembers: formattedProjectMembers, teams: formattedTeams };
    } catch (error) {
      throw boom.badRequest(error.message || 'Failed to find project members');
    }
  }

  async getProjectMemberByUserId(projectId, userId){
    try {
      const projectMembers = await this.models.ProjectMember.findOne({
        where: { projectId },
        include: [{
          model: this.models.WorkspaceMember,
          as: 'workspaceMember',
          attributes: [],
          where: { userId }
        }]
      });

      return projectMembers;
    } catch (error) {
      throw boom.badRequest(error.message || 'Failed to find project members');
    }
  }

  async getProjectMemberById(projectId, projectMemberId){
    try {
      const member = await this.models.ProjectMember.findOne({
        where: { id: projectMemberId, projectId },
      });

      return member;
    } catch (error) {
      throw boom.badRequest(error.message || 'Failed to get project member status');
    }
  }
}

module.exports = ProjectMemberService;
