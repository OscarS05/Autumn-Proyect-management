const boom = require('@hapi/boom');

class ChecklistService{
  constructor({ getAllChecklistsByCardUseCase, getChecklistUseCase, getProjectMemberByChecklistUseCase, createChecklistByCopyingItemsUseCase, getAllChecklistsByProjectUseCase, createChecklistUseCase, updateChecklistUseCase, deleteChecklistUseCase }){
    this.getAllChecklistsByProjectUseCase = getAllChecklistsByProjectUseCase;
    this.getProjectMemberByChecklistUseCase = getProjectMemberByChecklistUseCase;
    this.getAllChecklistsByCardUseCase = getAllChecklistsByCardUseCase;
    this.getChecklistUseCase = getChecklistUseCase;
    this.createChecklistUseCase = createChecklistUseCase;
    this.createChecklistByCopyingItemsUseCase = createChecklistByCopyingItemsUseCase;
    this.updateChecklistUseCase = updateChecklistUseCase;
    this.deleteChecklistUseCase = deleteChecklistUseCase;
  }

  async getAllChecklistsByProject(projectId){
    return await this.getAllChecklistsByProjectUseCase.execute(projectId);
  }

  async getChecklistsByCard(cardId){
    return await this.getAllChecklistsByCardUseCase.execute(cardId);
  }

  async createChecklist(checklistData){
    return await this.createChecklistUseCase.execute(checklistData);
  }

  async createChecklistByCopyingItems(checklistId, checklistData){
    const checklistWithItems = await this.getChecklistUseCase.execute(checklistId);
    if(!checklistWithItems?.id) throw boom.notFound('The checklist does not exist or does not belong to the card');
    if(checklistWithItems.items?.length === 0) throw boom.conflict('The selected checklist has no items to copy');

    return await this.createChecklistByCopyingItemsUseCase.execute(checklistData, checklistWithItems);
  }

  async updateChecklist(checklistId, checklistData){
    return await this.updateChecklistUseCase.execute(checklistId, checklistData);
  }

  async deleteChecklist(checklistId){
    return await this.deleteChecklistUseCase.execute(checklistId);
  }

  async getProjectMemberByChecklist(userId, checklistId){
    return await this.getProjectMemberByChecklistUseCase.execute(userId, checklistId);
  }
}

module.exports = ChecklistService;
