import { AddCard } from './add-card.component.js';

export function renderLists(lists){
  console.log(lists);
  return `
    <section id="lists-cards" class="container-lists-cards">
      ${lists.map(
          (list) => `
            <section id="${list.id}" class="list-container list cards-style">
              <header class="header-title-card">
                <h3 class="title-card">${list.title}</h3>
                <i class="config-list fa-solid fa-ellipsis project" style="color: #3f4547;"></i>
                <div class="dropdown-list dropdown-menu workspace-settings-dropdown inactive">
                  <ul>
                    <li class="delete-list-option">Eliminar lista</li>
                  </ul>
                </div>
              </header>
              <ul class="container-lists">
                ${list.cards
                  .map(
                    (card) => `
                    <li class="cards lists">
                      <span>${card.name}</span>
                      <i class="config-card fa-solid fa-ellipsis project" style="color: #3f4547;"></i>
                      <div class="dropdown-card dropdown-menu workspace-settings-dropdown inactive">
                        <ul>
                          <li class="delete-card-option">Eliminar tarjeta</li>
                        </ul>
                      </div>
                    </li>
                  `
                  )
                  .join('')}
                <li class="add-card-container">
                  ${AddCard()}
                </li>
                <footer class="add-a-card-button add-a-list container-add-a-list">
                  <i class="fa-solid fa-plus"></i>
                  <p>Add card</p>
                </footer>
              </ul>
            </section>
          `
        )
      .join('')}
    </section>
  `;
}
