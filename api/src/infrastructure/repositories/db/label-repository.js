const boom = require('@hapi/boom');
const ILabelRepository = require('../../../domain/repositories/db/ILabelRepository');

class LabelRepository extends ILabelRepository{
  constructor(db){
    super();
    this.db = db;
  }

  async create(labelEntity){
    return await this.db.models.Label.create(labelEntity);
  }

  async createVisibilityOfLabel(cardId, labelId){
    return await this.db.models.CardLabel.create({ cardId, labelId });
  }

  async updateVisibility(ids, updateVisibilityLabelEntity){
    return await this.db.models.CardLabel.update(updateVisibilityLabelEntity, { where: { ...ids }, returning: true });
  }

  async update(labelId, updateLabelEntity){
    return await this.db.models.Label.update(updateLabelEntity, { where: { id: labelId }, returning: true });
  }

  async delete(labelId){
    return await this.db.models.Label.destroy({ where: { id: labelId } });
  }

  async findVisibleLabels(cardId){
    return await this.db.models.Card.findOne({
      where: { id: cardId },
      include: [{ model: this.db.models.Label, as: 'labels' }]
    });
  }

  async findOneById(labelId){
    throw boom.notImplemented('the findById(labelId) method is not implemented');
  }

  async findAll(projectId){
    return await this.db.models.Label.findAll({ where: { projectId } });
  }
}

module.exports = LabelRepository;
