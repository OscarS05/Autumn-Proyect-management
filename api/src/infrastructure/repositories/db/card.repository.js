const boom = require('@hapi/boom');

const ICardRepository = require('../../../domain/repositories/db/ICardRepository');

class CardRepository extends ICardRepository {
  constructor(db) {
    super();
    this.db = db;
  }

  async create(listId, cardEntity){
    return await this.db.models.Card.create(cardEntity, { where: { listId } });
  }

  async update(cardId, cardUpdateEntity){
    return await this.db.models.Card.update(cardUpdateEntity, { where: { id: cardId }, returning: true });
  }

  async delete(cardId){
    return await this.db.models.Card.destroy({ where: { id: cardId } });
  }

  async findOneById(cardId){
    return await this.db.models.Card.findOne({ where: { id: cardId } });
  }

  async findAll(listId){
    return await this.db.models.Card.findAll({ where: { listId } });
  }

  async checkProjectMembershipByCard(userId, listId, cardId){
    return await this.db.models.Card.findOne({
      where: { id: cardId },
      include: [{
        model: this.db.models.List,
        as: 'list',
        where: { id: listId },
        attributes: [],
        include: [{
          model: this.db.models.Project,
          as: 'project',
          attributes: [],
          include: [{
            model: this.db.models.ProjectMember,
            as: 'projectMembers',
            attributes: [],
            include: [{
              model: this.db.models.WorkspaceMember,
              as: 'workspaceMember',
              attributes: [],
              include: [{
                model: this.db.models.User,
                as: 'user',
                attributes: [],
                where: { id: userId },
              }],
            }]
          }],
        }],
      }],
    });
  }
}

module.exports = CardRepository;
