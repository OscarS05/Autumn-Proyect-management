import { ProjectsDropdownList } from './projects-list.dropdown.js';

export function WorkspaceDropdownList() {
  return `
    <div id="dropdown-workspace-list" class="inactive">
      <div id="content-dropdown-list">
        <h4 class="title-h4">Your workspaces</h4>
        <ul class="container-your-workspaces">
          <li class="container-workspace" id="personal-workspace">
            <div id="content-personal-workspace" class="workspace-li dropdown-workspaces-styles">
              <div class="workspace-letter-style">
                <span>P</span>
              </div>

              <div class="name-workspace">
                <p>Personal workspace</p>
              </div>
            </div>

            ${ProjectsDropdownList()}
          </li>
        </ul>

        <h4 class="title-h4">Workspaces where you are a guest</h4>

        <ul id="workspaces-where-youare-aguest" class="container-your-workspaces">
          <li class="container-workspace" id="teacher-workspace">
            <div id="content-teacher-workspace" class="workspace-li dropdown-workspaces-styles">
              <div class="workspace-letter-style">
                <span>T</span>
              </div>

              <div class="name-workspace">
                <p>Teacher workspace</p>
              </div>
            </div>

            ${ProjectsDropdownList()}
          </li>
        </ul>
      </div>
    </div>
  `;
}
