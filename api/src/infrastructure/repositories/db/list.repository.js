const IListRepository = require('../../../domain/repositories/db/IListRepository');

class ListRepository extends IListRepository {
  constructor(db){
    super();
    this.db = db;
  }

  async create(listEntity){
    return await this.db.models.List.create(listEntity, { where: { id: listEntity.projectId } });
  }

  async update(listId, listUpdateEntity){
    return await this.db.models.List.update(listUpdateEntity, { where: { id: listId }, returning: true });
  }

  async delete(projectId, listId){
    return await this.db.models.List.destroy({ where: { id: listId, projectId } });
  }

  async findOneById(projectId, listId){
    return await this.db.models.List.findOne({ where: { id: listId, projectId } });
  }

  async findAll(projectId){
    return await this.db.models.List.findAll({ where: { projectId } });
  }

  async checkProjectMembershipByList(userId, listId){
    return await this.db.models.List.findOne({
      where: { id: listId },
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
              where: { id: userId },
              attributes: [],
            }],
          }]
        }],
      }],
    });
  }
}

module.exports = ListRepository;
