const boom = require('@hapi/boom');
const IChecklistItemMemberRepository = require('../../../domain/repositories/db/IChecklistItemMemberRepository');

class ChecklistItemMemberRepository extends IChecklistItemMemberRepository {
  constructor(db){
    super();
    this.db = db;
  }

  async create(checklistItemMemberEntity){
    return await this.db.models.ChecklistItemMember.create(checklistItemMemberEntity);
  }

  async bulkCreate(checklistItemMembersEntities){
    return await this.db.models.ChecklistItemMember.bulkCreate(checklistItemMembersEntities);
  }

  async delete(checklistItemMemberId){
    throw boom.notImplemented('the delete(checklistItemMemberId) method is not implemented');
  }

  async findAll(checklistItemId){
    throw boom.notImplemented('the findAll(checklistItemId) method is not implemented');
  }

  async findAllByProjectMember(checklistItemId, projectMemberIds){
    return await this.db.models.ChecklistItemMember.findAll({ where: { checklistItemId, projectMemberId: projectMemberIds } });
  }
}

module.exports = ChecklistItemMemberRepository;
