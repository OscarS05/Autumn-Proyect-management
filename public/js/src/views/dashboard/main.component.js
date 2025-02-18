import { WorkspacesSection } from './workspaces.component.js';
import { RecentlyViewedWorkspaces } from './recently-viewed-workspaces.component.js';
import { WorkspaceTitleComponent } from './workspace-title.component.js';
import { WorkspacesAsAGuest } from './workspaces-as-guest.component.js';
import { newProject } from './new-project.component.js';


export function MainComponentOfTheDashboard(){
  return `
    <main id="your-projects" class="">
      ${RecentlyViewedWorkspaces()}

      <div class="container-your-workspaces">
        <h3 class="title-workspace">Your workspaces</h3>
        <div id="container-personal-workspace">
          ${WorkspaceTitleComponent()}
          <div class="container-projects">
            ${WorkspacesSection()}
            ${newProject()}
          </div>
        </div>
      </div>

      ${WorkspacesAsAGuest()}

      <button id="closed-projects-button">See all the closed projects</button>
    </main>
  `;
}
