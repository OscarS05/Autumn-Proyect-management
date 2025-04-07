const boom = require('@hapi/boom');

class LabelService{
  constructor({ getAllLabelsUseCase, getLabelUseCase, getLabelsByCardUseCase, createLabelUseCase, deleteLabelUseCase, updateLabelUseCase, updateVisibilityUseCase }){
    this.getAllLabelsUseCase = getAllLabelsUseCase;
    this.getLabelUseCase = getLabelUseCase;
    this.getLabelsByCardUseCase = getLabelsByCardUseCase;
    this.createLabelUseCase = createLabelUseCase;
    this.deleteLabelUseCase = deleteLabelUseCase;
    this.updateLabelUseCase = updateLabelUseCase;
    this.updateVisibilityUseCase = updateVisibilityUseCase;
  }

  async getAllLabels(projectId){
    return await this.getAllLabelsUseCase.execute(projectId);
  }

  async getLabelsByCard(cardId){
    return await this.getLabelsByCardUseCase.execute(cardId);
  }

  async createLabel(projectId, cardId, labelData){
    return await this.createLabelUseCase.execute(projectId, cardId, labelData);
  }

  async updateVisibilityLabel(isVisible, { cardId, labelId }){
    return await this.updateVisibilityUseCase.execute(isVisible, { cardId, labelId });
  }

  async updateLabel(labelId, labelData){
    return await this.updateLabelUseCase.execute(labelId, labelData);
  }

  async deleteLabel(labelId){
    return await this.deleteLabelUseCase.execute(labelId);
  }
}

module.exports = LabelService;
