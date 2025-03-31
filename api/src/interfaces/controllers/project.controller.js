const boom = require('@hapi/boom');

const { projectService } =  require('../../application/services/index');

const getProjectsByWorkspace = async (req, res, next) => {
  try {
    const { workspaceId } = req.params;

    const projects = await projectService.findAllByWorkspace(workspaceId);
    if(!projects) throw boom.notFound('Get projects by workspace operation returns null');

    res.status(200).json({ projects });
  } catch (error) {
    next(error);
  }
}

const createProject = async (req, res, next) => {
  try {
    const { name, visibility } = req.body;
    const workspaceMember = req.workspaceMember;
    const projectData = { name, visibility, workspaceId: workspaceMember.workspaceId, workspaceMemberId: workspaceMember.id }

    const projectCreated = await projectService.create(projectData);
    if(!projectCreated?.id) throw boom.badRequest('Failed to create workspace');

    res.status(201).json({ message: 'Project created successfully', projectCreated });
  } catch (error) {
    next(error);
  }
}

const updateProject = async (req, res, next) => {
  try {
    const { workspaceId, projectId } = req.params;
    const data = req.body;

    const updatedProject = await projectService.update(projectId, data);
    if(!updatedProject?.id) return boom.badRequest('Failed to create workspace');

    res.status(200).json({ message: 'Project updated successfully', updatedProject });
  } catch (error) {
    next(error);
  }
}

const deleteProject = async (req, res, next) => {
  try {
    const projectMember = req.projectMember;

    const response = await projectService.delete(projectMember.projectId);
    if(response === 0) return boom.badRequest('Failed to delete project');

    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getProjectsByWorkspace,
  createProject,
  updateProject,
  deleteProject,
}
