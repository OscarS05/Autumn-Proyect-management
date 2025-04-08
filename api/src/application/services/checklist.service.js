const boom = require('@hapi/boom');

class ChecklistService{
  constructor({ getAllChecklistsByCardUseCase, getAllChecklistsByProjectUseCase, createChecklistUseCase, updateChecklistUseCase, deleteChecklistUseCase }){
    this.getAllChecklistsByProjectUseCase = getAllChecklistsByProjectUseCase;
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
}

module.exports = ChecklistService;
