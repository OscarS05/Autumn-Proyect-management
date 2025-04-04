import { AddCard } from './add-card.component.js';
import { renderLists } from './renderList.component.js';

export function Main(lists){
  return `
    <section id="project-screen" class="project-screen-container">
      <header id="project-planning-screen">
          <div class="content-left-header-planning-project">
              <div class="title-project">
                  <span>Project screen</span>
              </div>
              <div>
                  <div id="members-project-icon">
                      <i class="fa-solid fa-users" style="color: #ffffff;"></i>
                  </div>
              </div>
          </div>

          <div class="content-right-header-planning-project">
              <div id="planning-project-menu" class="project-menu ellipsis">
                  <i id="project-planning-menu-icon" class="fa-solid fa-ellipsis project" style="color: #ffffff;"></i>
              </div>
              <div id="project-screen-settings" class="project-settings-container workspace-settings-dropdown inactive">
                  <div id="update-background">
                      <span class="labels-create-project">Background:</span>
                      <div class="container-images">
                        <img data-bg="bosque-1.png" src="assets/images/bosque-1.png" class="image img-background-style" alt="bosque-1">
                        <img data-bg="bosque-2.jpeg" src="assets/images/bosque-2.jpeg" class="image img-background-style" alt="bosque-2">
                        <img data-bg="bosque-3.jpeg" src="assets/images/bosque-3.jpeg" class="image img-background-style" alt="bosque-3">
                        <img  data-bg="bosque-4.jpeg" src="assets/images/bosque-4.jpeg" class="image img-background-style" alt="bosque-4">
                        <img data-bg="bosque-5.jpg" src="assets/images/bosque-5.jpg" class="image img-background-style" alt="bosque-5">
                      </div>
                      <div class="container-preview">
                        <div id="preview-background-image" class="preview-background">
                          <img src="assets/images/preview-background.png" class="preview-background-img" alt="preview-background">
                        </div>
                      </div>
                      <button id="apply-background-btn" class="buttons-style apply-background-button">Apply Background</button>
                  </div>
              </div>
          </div>
      </header>

      <div class="lists-layout">
        ${renderLists(lists)}

        <section id="add-new-list" class="add-a-list styles-white-add-a-list container-add-a-list">
          <i class="fa-solid fa-plus"></i>
          <p>Add list</p>
        </section>
        <div id="add-list-container"></div>
      </div>
    </section>
  `;
}
