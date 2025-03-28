const boom = require('@hapi/boom');

const { workspaceService } =  require('../../application/services/index');
const { WorkspaceRedis } = require('../../infrastructure/repositories/cache/index');

const getWorkspaceAndItsProjects = async (req, res, next) => {
  try {
    const userId = req.user.sub;
    const { workspaceId } = req.params;

    const workspaceAndItsProjects = await WorkspaceRedis.getWorkspaceAndItsProjects(workspaceId, userId);
    if(workspaceAndItsProjects){
      return res.status(200).json({ workspace: workspaceAndItsProjects});
    }
    const data = await workspaceService.findWorkspaceAndItsProjects(workspaceId, userId);
    if(data && data.length > 0){
      return res.status(200).json({ workspace: data});
    }

    res.status(200).json({ message: 'Workspace not found', workspace: data });
  } catch (error) {
    next(error);
  }
}

const getWorkspacesAndProjects = async (req, res, next) => {
  try {
    const userId = req.user.sub;

    const workspacesAndProjects = await workspaceService.getWorkspacesAndProjects(userId);

    res.status(200).json({ workspacesAndProjects });
  } catch (error) {
    next(error);
  }
}

const createWorkspace = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const userId = req.user.sub;
    const workspaceData = { name, description, userId };

    const workspace = await workspaceService.createWorkspace(workspaceData);
    if(!workspace) throw boom.badRequest('create workspace operation returns null');

    res.status(201).json({ workspace });
  } catch (error) {
    next(error);
  }
}

const updateWorkspace = async (req, res, next) => {
  try {
    const data = req.body;
    const { workspaceId } = req.params;

    const workspaceUpdated = await workspaceService.update(workspaceId, data);
    if(!workspaceUpdated) throw boom.badRequest('create workspace operation returns null');

    res.status(200).json({ message: 'Workspace updated successfully', workspace: workspaceUpdated });
  } catch (error) {
    next(error);
  }
}

const deleteWorkspace = async (req, res, next) => {
  try {
    const { workspaceId } = req.params;

    const deletedWorkspace = await workspaceService.delete(workspaceId);
    if(deletedWorkspace === 0) throw boom.notFound('Delete workspace operation returns 0');

    res.status(200).json({ message: 'Workspace deleted successfully' });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getWorkspaceAndItsProjects,
  getWorkspacesAndProjects,
  createWorkspace,
  updateWorkspace,
  deleteWorkspace,
}
