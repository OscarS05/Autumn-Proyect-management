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

  async transferOwnership(currentOwner, newOwner){
    throw boom.notImplemented('the transferOwnership(currentOwner, newOwner) method is not implemented');
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
