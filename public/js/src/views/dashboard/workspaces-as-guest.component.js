import { WorkspacesSection } from './workspaces.component.js';

export function   WorkspacesAsAGuest(){
  return `
    <div id="container-you-are-guest" class="container-your-workspaces">
      <h3 class="title-workspace">Workspace in which you are a guest</h3>

      <div id="container-teacher-workspace">
        <div class="container-title-buttons">
          <div class="container-name-workspace">
            <i class="fa-solid fa-users users-a-guest" style="color: #3f4547;"></i>
            <span class="name-workspace-main">Teacher workspace</span>
          </div>
        </div>

        <div class="container-projects">
          ${WorkspacesSection()}
        </div>
      </div>
    </div>
  `;
}
