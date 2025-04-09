const boom = require('@hapi/boom');

class ChecklistService{
  constructor({ getAllChecklistsByCardUseCase, getProjectMemberByChecklistUseCase, getAllChecklistsByProjectUseCase, createChecklistUseCase, updateChecklistUseCase, deleteChecklistUseCase }){
    this.getAllChecklistsByProjectUseCase = getAllChecklistsByProjectUseCase;
    this.getProjectMemberByChecklistUseCase = getProjectMemberByChecklistUseCase;
    this.getAllChecklistsByCardUseCase = getAllChecklistsByCardUseCase;
    this.createChecklistUseCase = createChecklistUseCase;
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
