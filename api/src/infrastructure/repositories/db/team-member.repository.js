const ITeamMemberRepository = require('../../../domain/repositories/db/ITeamMemberRepository');

class TeamMemberRepository extends ITeamMemberRepository{
  constructor(db){
    super();
    this.db = db;
  }

  async create(teamMemberEntity){
    throw boom.notImplemented('the create() method is not implemented');
  }
  async updateRole(teamMemberId, newRole){
    throw boom.notImplemented('the updateRole(teamMemberId, newRole) method is not implemented');
  }

  async transferOwnership(teamId, currentOwner, newOwner){
    const transaction = await this.db.transaction();
    try {
      const [ updatedRows, [ updatedWorkspace ] ] = await this.db.models.Team.update(
        { workspaceMemberId: newOwner.workspaceMemberId },
        { where: { id: teamId }, returning: true, transaction }
      );
      if(updatedRows === 0) throw boom.badRequest('Failed to update workspace owner');

      const [ newOwnerUpdated, formerOwnerUpdated ] = await Promise.all([
        this.db.models.TeamMember.update(
          { role: 'owner' },
          { where: { workspaceMemberId: newOwner.workspaceMemberId }, transaction }
        ),
        this.db.models.TeamMember.update(
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

  async delete(teamMemberId){
    throw boom.notImplemented('the delete(teamMemberId) method is not implemented');
  }

  async findAll(teamId, workspaceId){
    return await this.db.models.TeamMember.findAll({ where: { teamId, workspaceId } });
  }

  async findOneByUserId(userId, workspaceId, teamId){
    return await this.db.models.TeamMember.findOne({
      where: { teamId },
      include: [{
        model: this.db.models.WorkspaceMember,
        as: 'workspaceMember',
        where: { workspaceId, userId }
      }]
    });
  }
}

module.exports = TeamMemberRepository
