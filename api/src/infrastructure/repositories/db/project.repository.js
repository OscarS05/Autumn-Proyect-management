const boom = require('@hapi/boom');
const IProjectRepository = require('../../../domain/repositories/db/IProjectRepository');

class ProjectRepository extends IProjectRepository{
  constructor(db){
    super();
    this.db = db;
  }

  async create(projectEntity, projectMemberEntity){
    const transaction = await this.db.transaction();
    try {
      const project = await this.db.models.Project.create(projectEntity, { transaction });
      await this.db.models.ProjectMember.create(projectMemberEntity, { transaction });
      await transaction.commit();

      return project;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async update(projectId, projectUpdateEntity){
    return await this.db.models.Project.update(projectUpdateEntity, {
      where: { id: projectId },
      returning: true,
    });
  }

  async delete(projectId){
    return await this.db.models.Project.destroy({ where: { id: projectId } });
  }

  async findById(projectId){
    return await this.db.models.Project.findOne({ where: { id: projectId } });
  }

  async findAllByWorkspace(workspaceId){
    return await this.db.models.Project.findAll({
      where: { workspaceId }
    });
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

  async countProjects(workspaceMemberId){
    return await this.db.models.ProjectMember.count(
      { where: { workspaceMemberId } }
    )
  }
}

module.exports = ProjectRepository;
