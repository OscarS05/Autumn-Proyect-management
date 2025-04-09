const boom = require("@hapi/boom");

class ChecklistItemMemberService {
  constructor({ getAllItemMembersUseCase, addMemberToItemUseCase, deleteChecklistItemUseCase }, { checkListItemByIdAndProjectUseCase }){
    this.getAllItemMembersUseCase = getAllItemMembersUseCase;
    this.addMemberToItemUseCase = addMemberToItemUseCase;
    this.deleteChecklistItemUseCase = deleteChecklistItemUseCase;

    // checklist item use cases
    this.checkListItemByIdAndProjectUseCase = checkListItemByIdAndProjectUseCase;
  }

  async getAllChecklistItemMembers(requesterAsProjectMember, checklistItemId){
    const checklistItem = await this.checkListItemByIdAndProjectUseCase.execute(checklistItemId, requesterAsProjectMember.projectId);
    if(!checklistItem?.id) throw boom.badData('The checklistItemId provided does not belong to the project');

    return await this.getAllItemMembersUseCase.execute(checklistItemId);
  }

  async addMemberToChecklistItem(requesterAsProjectMember, checklistItemId, availableMembersToBeAddedIds){
    const checklistItem = await this.checkListItemByIdAndProjectUseCase.execute(checklistItemId, requesterAsProjectMember.projectId);

    if(!checklistItem?.id) throw boom.badData('The checklistItemId provided does not belong to the project');
    if(availableMembersToBeAddedIds.length === 0) return [];

    return await this.addMemberToItemUseCase.execute(checklistItemId, availableMembersToBeAddedIds);
  }

  async deleteChecklistItemMember(requesterAsProjectMember, checklistItemId, projectMemberId){
    const checklistItem = await this.checkListItemByIdAndProjectUseCase.execute(checklistItemId, requesterAsProjectMember.projectId);
    if(!checklistItem?.id) throw boom.badData('The checklistItemId provided does not belong to the project');

    return await this.deleteChecklistItemUseCase.execute(checklistItemId, projectMemberId);
  }
}

module.exports = ChecklistItemMemberService;
