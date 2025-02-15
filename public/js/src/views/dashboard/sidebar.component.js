export function Sidebar(){
  return `
    <aside id="sidebar" class="">
      <div class="content-sidebar">
        <div class="container-projects-settings">
          <div id="lobby-sidebar" class="content-projects-settings projects-sidebar-styles">
            <i class="fa-solid fa-layer-group img-projects-sidebar"></i>
            <p>Lobby</p>
          </div>
        </div>

        <div class="container-workspaces-sidebar">
          <h4 class="title-h4 h4-sidebar">Workspaces</h4>
          <ul class="workspaces-sidebar-styles">
            <li id="personal-workspace" class="projects-list container-workspace-sidebar-styles">
              <div class="content-workspace-btn">
                <div>
                  <div id="content-personal-workspace" class="dropdown-workspaces-styles">
                    <div class="workspace-letter-style workspace-letter-sidebar">
                      <span>P</span>
                    </div>

                    <div class="name-workspace name-workspace-sidebar-styles">
                      <p>Personal workspace</p>
                    </div>
                  </div>
                </div>
                <i class="fa-solid fa-chevron-down chevron-down chevron-down-sidebar" style="color: #363c42;"></i>
              </div>

              <div class="project-list-dropdown-container inactive">
                <div id="content-family-project" class="dropdown-workspace dropdown-workspaces-styles">
                  <div class="img-semester-4 project-name-img"></div>
                  <div class="name-workspace name-workspace-sidebar-styles">
                    <p>Family project</p>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  `;
}
