const boom = require('@hapi/boom');
const IProjectMemberRepository = require('../../../domain/repositories/db/IProjectMemberRepository');

class ProjectMemberRepository extends IProjectMemberRepository {
  constructor(db){
    super();
    this.db = db;
  }

  async create(projectMemberEntity){
    return await this.db.models.ProjectMember.create(projectMemberEntity);
  }

  async updateRole(projectMemberId, newRole){
    return await this.db.models.ProjectMember.update(
      { role: newRole },
      { where: { id: projectMemberId }, returning: true }
    );
  }

  async transferOwnership(projectId, currentOwner, newOwner){
    const transaction = await this.db.transaction();
    try {
      const [ updatedRows, [ updatedWorkspace ] ] = await this.db.models.Project.update(
        { workspaceMemberId: newOwner.workspaceMemberId },
        { where: { id: projectId }, returning: true, transaction }
      );
      if(updatedRows === 0) throw boom.badRequest('Failed to update workspace owner');

      const [ newOwnerUpdated, formerOwnerUpdated ] = await Promise.all([
        this.db.models.ProjectMember.update(
          { role: 'owner' },
          { where: { workspaceMemberId: newOwner.workspaceMemberId }, transaction }
        ),
        this.db.models.ProjectMember.update(
          { role: 'admin' },
          { where: { workspaceMemberId: currentOwner.workspaceMemberId }, transaction }
        ),
      ]);
      await transaction.commit();
      return newOwnerUpdated;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async delete(projectMemberId){
    return await this.db.models.ProjectMember.destroy({ where: { id: projectMemberId } });
  }

  async findProjectMemberById(projectMemberId){
    return await this.db.models.ProjectMember.findOne({ where: { id: projectMemberId } });
  }

  async findByWorkspaceMember(workspaceMemberId, projectId){
    return await this.db.models.ProjectMember.findOne({ where: { projectId, workspaceMemberId } });
  }

  async findByUser(userId, workspaceId, projectId){
    return await this.db.models.ProjectMember.findOne({
      where: { projectId },
      include: [{
        model: this.db.models.WorkspaceMember,
        as: 'workspaceMember',
        attributes: [],
        where: { userId, workspaceId }
      }]
    });
  }

  async findAll(workspaceMemberId){
    return await this.db.models.ProjectMember.findAll({
      where: { workspaceMemberId },
      include: [{ model: this.db.models.Project, as: 'project' }]
    });
  }

  async findAllByProject(projectId){
    return await this.db.models.ProjectMember.findAll({ where: { projectId } });
  }

  async findProjectWithItsMembersAndTeams(projectId){
    return await this.db.models.Project.findOne({
      where: { id: projectId },
      include: [
        {
          model: this.db.models.ProjectMember,
          as: 'projectMembers',
          include: [{
            model: this.db.models.WorkspaceMember,
            as: 'workspaceMember',
            attributes: ['id', 'userId'],
            include: [{
              model: this.db.models.User,
              as: 'user',
              attributes: ['id', 'name'],
            }]
          }]
        },
        {
          model: this.db.models.Team,
          as: 'teams',
          attributes: ['id', 'name', 'workspaceId'],
          include: [{
            model: this.db.models.TeamMember,
            as: 'teamMembers',
            include: [{
              model: this.db.models.WorkspaceMember,
              as: 'workspaceMember',
              attributes: ['id', 'userId'],
              include: [{
                model: this.db.models.User,
                as: 'user',
                attributes: ['id', 'name'],
              }]
            }]
          }],
          through: { attributes: [] },
        }
      ],
      attributes: ['id', 'name', 'workspaceId'],
    });
  }

  async getProjectMemberByCard(userId, card){
    return await this.db.models.ProjectMember.findOne({
      where: { projectId: card.list.projectId },
      include: [{
        model: this.db.models.WorkspaceMember,
        as: 'workspaceMember',
        attributes: [],
        where: { userId }
      }]
    });
  }

  async checkProjectMemberByUser(userId, projectId){
    return await this.db.models.ProjectMember.findOne({
      where: { projectId },
      include: [{
        model: this.db.models.WorkspaceMember,
        as: 'workspaceMember',
        where: { userId },
        attributes: []
      }]
    });
  }

  async findAllById(projectMemberIds, projectId){
    return await this.db.models.ProjectMember.findAll({ where: { id: projectMemberIds, projectId } });
  }
}

module.exports = ProjectMemberRepository;
