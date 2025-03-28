const WorkspaceName = require('../value-objects/workspaceName');
const WorkspaceDescription = require('../value-objects/workspaceDescription');

class UpdateWorkspaceEntity {
  constructor({ name, description }) {
    this.name = new WorkspaceName(name);
    this.description = new WorkspaceDescription(description);
  }

  toPlainObject() {
    return {
      name: this.name.value,
      description: this.description.value,
    };
  }
}

module.exports = UpdateWorkspaceEntity;
