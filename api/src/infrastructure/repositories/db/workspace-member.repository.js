const IWorkspaceMemberRepository = require('../../../domain/repositories/db/IWorkspaceMemberRepository');

class WorkspaceMemberRepository extends IWorkspaceMemberRepository {
  constructor(db){
    super();
    this.db = db;
  }

  async create(workspaceEntity){
    throw boom.notImplemented('the create() method is not implemented');
  }

  async update(workspaceEntity){
    throw boom.notImplemented('the update() method is not implemented');
  }

  async delete(workspaceMemberId){
    throw boom.notImplemented('the delete() method is not implemented');
  }

  async findWorkspaceMemberByUserId(workspaceId, userId){
    return await this.db.models.WorkspaceMember.findOne({
      where: { workspaceId, userId },
    });
  }

  async findWorkspaceMemberById(workspaceMemberId){
    throw boom.notImplemented('the findMemberByUserId() method is not implemented');
  }

  async findAll(workspaceId){
    return await this.db.models.WorkspaceMember.findAll(
      { where: { workspaceId } }
    );
  }
}

module.exports = WorkspaceMemberRepository;
