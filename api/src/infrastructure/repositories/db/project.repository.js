const boom = require('@hapi/boom');
const IProjectRepository = require('../../../domain/repositories/db/IProjectRepository');

class ProjectRepository extends IProjectRepository{
  constructor(db){
    super();
    this.db = db;
  }

  async create(projectEntity){
    throw boom.notImplemented('the create() method is not implemented');
  }

  async update(projectEntity){
    throw boom.notImplemented('the update() method is not implemented');
  }

  async delete(workspaceId){
    throw boom.notImplemented('the delete() method is not implemented');
  }

  async findById(workspaceId){
    throw boom.notImplemented('the findById() method is not implemented');
  }

  async findAllByWorkspaceMember(workspaceId, workspaceMemberId){
    const projects = await this.db.models.Project.findAll({
      where: { workspaceId },
      include: [
        {
          model: this.db.models.ProjectMember,
          as: 'projectMembers',
          required: true,
          where: { workspaceMemberId },
          attributes: []
        }
      ],
      attributes: ['id', 'name']
    });

    const projectIds = projects.map(p => p.id);
    if (projectIds.length === 0) return [];

    return await this.db.models.Project.findAll({
      where: { id: projectIds },
      include: [{ model: this.db.models.ProjectMember, as: 'projectMembers'}]
    });
  }
}

module.exports = ProjectRepository;
