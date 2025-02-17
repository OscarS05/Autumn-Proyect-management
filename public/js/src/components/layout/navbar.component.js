import { WorkspaceDropdownList } from "../dropdowns/workspaces-list.dropdown.js";
import { DropdownMenuToCreate } from "../dropdowns/options-to-create.dropdown.js";
import { CreateProjectsDropdownMenu } from "../dropdowns/create-projects.dropdown.js";

export function Navbar() {
  return `
    <nav id="navbar">
      <div id="container-navbar-left">
        <div id="container-logo-navbar">
          <img class="logo-navbar" src="assets/images/logoProyecto.png" alt="logo">
          <p id="name-logo">Autumn</p>
        </div>
        <ul id="container-workspaces-create">
          <li id="content-workspaces-chevron">
            <div class="workspaces-navbar">
              Workspaces
            </div>
            <i id="chevron-down-navbar" class="fa-solid fa-chevron-down chevron-down"></i>
          </li>

          <button class="buttons-style" id="button-create-navbar">Create</button>
        </ul>
      </div>

      <div id="navbar-right">
        <ul>
          <div id="navbar-search" class="search-style">
            <form action="/search" class="content-search">
              <input type="text" id="placeholder-search-navbar" class="search search-styles" placeholder="Search">
              <i class="fa-solid fa-magnifying-glass magnifying-glass"></i>
            </form>
          </div>
          <div id="notification-navbar">
            <i class="fa-solid fa-bell notification-navbar-img"></i>
          </div>
          <div id="info-navbar">
            <i class="fa-solid fa-circle-info info-navbar-img"></i>
          </div>
          <div class="profile-navbar-right">
            <div id="my-navbar-profile" class="profile-navbar">
              <span>OM</span>
            </div>
            <div id="profile-dropdown" class="dropdown-menu workspace-settings-dropdown inactive">
              <button id="logout-button" class="logout-button buttons-style">Logout</button>
            </div>
          </div>
        </ul>
      </div>
    </nav>

    ${WorkspaceDropdownList()}
    ${DropdownMenuToCreate()}
    ${CreateProjectsDropdownMenu()}
  `;
}
