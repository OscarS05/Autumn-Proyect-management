import { WorkspacesSection } from './workspaces.component.js';

export function RecentlyViewedWorkspaces(){
  return `
    <div class="container-recently-seen">
      <div class="container-your-workspaces">
        <div class="title-container-recently-seen">
          <i class="fa-regular fa-clock clock-main" style="color: #3f4547;"></i>
          <h3 class="title-workspace title-recently-seen">Recently seen</h3>
        </div>

        <div class="container-projects">
          ${WorkspacesSection()}
        </div>
      </div>
    </div>
  `;
}
