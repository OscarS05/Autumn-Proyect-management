const boom = require('@hapi/boom');

class IChecklistItemMemberRepository {
  async create(checklistItemMemberEntity){
    throw boom.notImplemented('the create(checklistItemMemberEntity) method is not implemented');
  }

  async bulkCreate(checklistItemMembersEntities){
    throw boom.notImplemented('the create(checklistItemMembersEntities) method is not implemented');
  }

  async delete(checklistItemMemberId){
    throw boom.notImplemented('the delete(checklistItemMemberId) method is not implemented');
  }

  async findAll(checklistItemId){
    throw boom.notImplemented('the findAll(checklistItemId) method is not implemented');
  }

  async findAllByProjectMemberId(checklistItemId){
    throw boom.notImplemented('the findAll(checklistItemId) method is not implemented');
  }
}

module.exports = IChecklistItemMemberRepository;
