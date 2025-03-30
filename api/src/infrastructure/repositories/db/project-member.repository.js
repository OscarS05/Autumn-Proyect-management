const boom = require('@hapi/boom');
const IProjectMemberRepository = require('../../../domain/repositories/db/IProjectMemberRepository');

class ProjectMemberRepository extends IProjectMemberRepository {
  constructor(db){
    super();
    this.db = db;
  }

  async create(projectMemberEntity){
    throw boom.notImplemented('the create() method is not implemented');
  }

  async updateRole(projectMemberId, newRole){
    throw boom.notImplemented('the updateRole() method is not implemented');
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
          { where: { workspaceMemberId: currentOwner.id }, transaction }
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
    throw boom.notImplemented('the crdeleteeate() method is not implemented');
  }

  async findAll(workspaceMemberId){
    return await this.db.models.ProjectMember.findAll({
      where: { workspaceMemberId },
      include: [{ model: this.db.models.Project, as: 'project' }]
    });
  }
}

module.exports = ProjectMemberRepository;
