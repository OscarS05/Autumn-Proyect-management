import { WorkspaceSettingsModal } from '../../components/ui/workspace-settings.modal.js';
import { ModifyWorkspace } from '../../components/ui/modify-workspace.modal.js';
import { ConfirmDeleteWorkspace } from '../../components/ui/confirm-delete-workspace.modal.js';

export function WorkspaceTitleComponent(){
  return `
    <div class="container-title-buttons">
      <div class="container-name-workspace">
        <div id="letter-personal-workspace" class="letter-workspace">
          <span>S</span>
        </div>
        <span class="name-workspace-main">Personal workspace</span>
      </div>

      <div class="content-buttons">
        <!-- <div id="button-projects" class="projects-btn buttons-workspace-style">
          <i class="fa-solid fa-layer-group" style="color: #6a6a6a;"></i>
          <span>Projects</span>
        </div> -->

        <div class="btn-members buttons-workspace-style">
          <i class="fa-solid fa-user" style="color: #6a6a6a;"></i>
          <span>Members (<span>1</span>)</span>
        </div>

        <div>
          <div id="button-settings" class="button-settings-workspace buttons-workspace-style">
            <i class="fa-solid fa-gear" style="color: #6a6a6a;"></i>
            <span>Settings</span>
          </div>

          ${WorkspaceSettingsModal()}
          ${ModifyWorkspace()}
          ${ConfirmDeleteWorkspace()}
        </div>

        <div class="buttons-workspace-style button-team">
          <i class="fa-solid fa-users" style="color: #6a6a6a;"></i>
          <span>Teams</span>
        </div>
      </div>
    </div>
  `;
}
