import { Navbar } from '../../components/layout/navbar.component.js';
import { Sidebar } from '../../views/dashboard/sidebar.component.js';


export async function renderDashboard(root){
  root.innerHTML = `
    <div id="" class="header-aside-white dashboard-container" style="overflow-y: hidden;">
      <header class="header-navbar">
        ${Navbar()}
      </header>
      <div id="layout">
        ${Sidebar()}
      </div>
    </div>
  `;
}
