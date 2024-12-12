import { Navbar } from './navbar.component.js';
import { Aside } from './aside.component.js';
import { Main } from './main.component.js';
import { navigateTo } from '../../router.js';
import { createCardHandler, createListHandler } from '../../controllers/project-screen.controller.js';
import { deleteCard, deleteList, getAllLists, updateCard, updateList } from '../../api/project-screen.api.js';
import { renderLists } from './renderList.component.js';
import { AddCard } from './add-card.component.js';

export const projectData = {
  lists: [],
};

function addListToProjectData(list) {
  const newList = {
    id: list.id,
    title: list.name,
    cards: list.card,
  };
  projectData.lists.push(newList);
}

export async function renderProjectScreen(root) {
  root.innerHTML = `
    <div id="project-screen-container" class="header-aside-white header-aside-black" style="overflow-y: hidden;">
      <header class="header-navbar">
        ${Navbar()}
      </header>
      <div id="layout">
        ${Aside()}
        ${Main(projectData.lists)}
      </div>
    </div>
  `;

  try {
    const allLists = await getAllLists();
    allLists.forEach(list => {
      addListToProjectData(list);
    });

    updateListsUI(root);
  } catch (error) {
    console.error('Error fetching lists:', error);
    alert('Failed reload lists the page');
  }

  function updateListsUI(root) {
    const listsContainer = document.querySelector('#lists-cards');
    if (!listsContainer) return;

    listsContainer.outerHTML = renderLists(projectData.lists);
  }


  // List navigation and card settings
  document.addEventListener('click', (event) => {
    if (!event.target.closest('.config-list') && !event.target.closest('.config-card') && !event.target.closest('.dropdown-menu')) {
      const allDropdowns = document.querySelectorAll('.dropdown-list, .dropdown-card');
      allDropdowns.forEach((dropdown) => dropdown.classList.add('inactive'));
    }
  });


  // Create new list
  document.getElementById('add-new-list').addEventListener('click', () => {
    const container = document.getElementById('add-list-container');
    if (container.querySelector('input')) return;

    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Enter list name';
    input.id = 'add-list';
    input.classList.add('input-new-list');

    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save';
    saveButton.classList.add('buttons-style');

    saveButton.addEventListener('click', async () => {
      const listName = input.value.trim();
      if (!listName) {
        alert('Please provide a name for the list.');
        return;
      }
      const response = await createListHandler(listName);
      const data = await response.json();

      if(response.status == 201){
        const containerLists = document.getElementById('lists-cards');
        const addNewListBtn = container.querySelector('.add-new-list');
        const newListSection = document.createElement('section');
        const addCardContainer = newListSection.querySelector('#add-card');
        newListSection.id = data.id;
        newListSection.classList.add('list-container', 'list', 'cards-style');

        newListSection.innerHTML = `
          <header class="header-title-card">
            <h3 class="title-card">${data.name}</h3>
            <i class="config-list fa-solid fa-ellipsis project" style="color: #3f4547;"></i>
            <div class="dropdown-list dropdown-menu workspace-settings-dropdown inactive">
              <ul>
                <li class="delete-list-option">Eliminar lista</li>
              </ul>
            </div>
          </header>
          <ul class="container-lists">
            ${AddCard()}
            <footer class="add-a-card-button add-a-list container-add-a-list">
              <i class="fa-solid fa-plus"></i>
              <p>Add card</p>
            </footer>
          </ul>
        `;
        containerLists.insertBefore(newListSection, addNewListBtn);
        input.remove();
        saveButton.remove();
      }
    });

    container.appendChild(input);
    container.appendChild(saveButton);
    input.focus();
  });
  // Create new card
  const targetContainer = document.getElementById('lists-cards');
  targetContainer.addEventListener('click', async (event) => {
    const target = event.target;

    if (target.closest('.add-a-card-button')) {
      const listContainer = target.closest('.list-container');
      console.log(listContainer);
      const addCardContainer = listContainer.querySelector('#add-card');
      console.log(addCardContainer);
      if (addCardContainer) {
        addCardContainer.classList.remove('inactive');
      }
    }

    if (target.id === 'add-card-btn') {
      const listContainer = target.closest('.list-container');
      const addCardContainer = listContainer.querySelector('#add-card');
      const textarea = addCardContainer.querySelector('.name-new-item');
      const cardName = textarea.value.trim();
      if (cardName) {
        const response = await createCardHandler({ cardName: cardName, listId: listContainer.id });
        const data = await response.json();
        if(response.status == 201){
          const cardList = listContainer.querySelector('.container-lists');
          cardList.insertBefore(
            document.createElement('li'),
            addCardContainer
          ).outerHTML = `
            <li id="${data.id}" class="cards lists">
              <span>${data.name}</span>
              <i class="config-card fa-solid fa-ellipsis project" style="color: #3f4547;"></i>
              <div class="dropdown-card dropdown-menu workspace-settings-dropdown inactive">
                <ul>
                  <li class="delete-card-option">Eliminar tarjeta</li>
                </ul>
              </div>
            </li>
          `;

          textarea.value = '';
          addCardContainer.classList.add('inactive');
        } else {
          console.error('Failed to create card:', data);
        }
      } else {
        alert('Card title cannot be empty.');
      }
    }

    if (target.classList.contains('close-add-card')) {
      const addCardContainer = target.closest('#add-card');
      addCardContainer.classList.add('inactive');
    }
  });

  // Delete list or card
  const listsContainer = document.getElementById('lists-cards');
  listsContainer.addEventListener('click', async (event) => {
    const allDropdowns = document.querySelectorAll('.dropdown-list, .dropdown-card');
    allDropdowns.forEach((dropdown) => dropdown.classList.add('inactive'));

    if (event.target.classList.contains('config-list')) {
      const listElement = event.target.closest('.list');
      const dropdown = listElement.querySelector('.dropdown-list');
      dropdown.classList.toggle('inactive');
      return;
    }
    if (event.target.classList.contains('config-card')) {
      const cardElement = event.target.closest('.cards');
      const dropdown = cardElement.querySelector('.dropdown-card');
      dropdown.classList.toggle('inactive');
      return;
    }
    if (event.target.classList.contains('delete-list-option')) {
      const listElement = event.target.closest('.list');
      const listId = listElement.id;
      const listName = listElement.querySelector('.title-card').textContent;
      try {
        const response = await deleteList({ listName: listName });

        if (response.ok) {
          listElement.remove();
          console.log(`List with name ${listName} was deleted successfully.`);
        } else {
          const errorData = await response.json();
          console.error('Error deleting list:', errorData.message);
          alert('Failed to delete the list. Please try again.');
        }
      } catch (error) {
        console.error('Network error while deleting list:', error);
        alert('Network error. Please try again later.');
      }
      return;
    }
    if (event.target.classList.contains('delete-card-option')) {
      const cardElement = event.target.closest('.cards');
      const listId = event.target.closest('.list-container').id;
      const cardName = cardElement.querySelector('span').textContent;

      try {
        const response = await deleteCard({ cardName: cardName, listId: listId});

        if(response.ok){
          cardElement.remove();
          console.log(`Card with name ${cardName} was deleted successfully.`);
        }else {
          const errorData = await response.json();
          console.error('Error deleting card:', errorData.message);
          alert('Failed to delete the card. Please try again.');
        }
      } catch (error) {
        console.error('Network error while deleting card:', error);
        alert('Network error. Please try again later.');
      }
      return;
    }
  });

  // Update list name
  document.getElementById('lists-cards').addEventListener('dblclick', (event) => {
    if (event.target.classList.contains('title-card')) {
      const titleElement = event.target;
      const currentTitle = titleElement.textContent;

      const input = document.createElement('input');
      input.type = 'text';
      input.value = currentTitle;
      input.classList.add('edit-title-input');

      titleElement.replaceWith(input);
      input.focus();

      let isSaving = false;

      const saveTitle = async () => {
        if (isSaving) return;
        isSaving = true;

        const newTitle = input.value.trim() || currentTitle;

        try {
          const response = await updateList({ listName: currentTitle, newName: newTitle });

          if (response.ok) {
            const newTitleElement = document.createElement('h3');
            newTitleElement.classList.add('title-card');
            newTitleElement.textContent = newTitle;

            input.replaceWith(newTitleElement);
            console.log(`List title updated to "${newTitle}" successfully.`);
          } else {
            const errorData = await response.json();
            console.error('Error updating list title:', errorData.message);
            alert('Failed to update the list title. Please try again.');
            cancelEdit();
          }

        } catch (error) {
          console.error('Network error while updating list title:', error);
          alert('Network error. Please try again later.');
          cancelEdit();
        } finally {
          isSaving = false;
        }
      };

      const cancelEdit = () => {
        const originalTitleElement = document.createElement('h3');
        originalTitleElement.classList.add('title-card');
        originalTitleElement.textContent = currentTitle;

        input.replaceWith(originalTitleElement);
      };

      input.addEventListener('blur', saveTitle);
      input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          saveTitle();
        }
      });
    }
  });
  // Update list card
  document.getElementById('lists-cards').addEventListener('dblclick', (event) => {
    if (event.target.closest('.cards span')) {
      const cardTitleElement = event.target;
      const currentCardTitle = cardTitleElement.textContent;
      const listId = cardTitleElement.closest('.list-container').id

      const input = document.createElement('input');
      input.type = 'text';
      input.value = currentCardTitle;
      input.classList.add('edit-title-input');

      cardTitleElement.replaceWith(input);
      input.focus();

      let isSaving = false;

      const saveTitle = async () => {
        if(isSaving) return;
        isSaving = true;

        const newTitle = input.value.trim() || currentCardTitle;
        console.log('this is newtitle', newTitle, 'this is currecardtitle', currentCardTitle, 'this is listid', listId);

        try {
          const response = await updateCard({ cardName: currentCardTitle, newName: newTitle, listId: listId });

          if (response.ok) {
            const newTitleElement = document.createElement('span');
            newTitleElement.textContent = newTitle;

            input.replaceWith(newTitleElement);
            console.log(`List title updated to "${newTitle}" successfully.`);
          } else {
            const errorData = await response.json();
            console.error('Error updating card title:', errorData.message);
            alert('Failed to update the card title. Please try again.');
            cancelEdit();
          }

        } catch (error) {
          console.error('Network error while updating list card:', error);
          alert('Network error. Please try again later.');
          cancelEdit();
        } finally {
          isSaving = false;
        }
      }

      const cancelEdit = () => {
        const originalTitleElement = document.createElement('span');
        originalTitleElement.textContent = currentCardTitle;

        input.replaceWith(originalTitleElement);
      };

      input.addEventListener('blur', saveTitle);
      input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          saveTitle();
        }
      });
    }
  });

  // Aside
  const aside = document.getElementById('aside');
  const asideHidden = document.querySelector('.aside-hidden');
  const layout = document.querySelector('#layout');

  document.getElementById('aside').addEventListener('click', (event) => {
    if(event.target.id === 'chevron-left-aside' || event.target.id === 'hide-aside'){
      aside.classList.add('inactive');
      asideHidden.classList.remove('inactive');
      layout.classList.add('layout-with-hidden-aside');
    }
  });
  document.getElementById('show-aside-button').addEventListener('click', (event) => {
    asideHidden.classList.add('inactive');
    aside.classList.remove('inactive');
    layout.classList.remove('layout-with-hidden-aside');
  });
  document.getElementById('project-planning-screen').addEventListener('click', (event) => {
    const settings = document.getElementById('project-screen-settings');
    if(event.target.id === 'planning-project-menu' || event.target.id === 'project-planning-menu-icon'){
      settings.classList.toggle('inactive');
    }
  });

  // Change background image
  const imagesContainer = document.querySelector('.container-images');
  const previewImage = document.querySelector('#preview-background-image');
  const allImages = imagesContainer.querySelectorAll('.img-background-style');
  const applyButton = document.querySelector('#apply-background-btn');
  const projectScreen = document.querySelector('.header-aside-black');
  let selectedImageSrc = null;

  const loadBackgroundFromStorage = () => {
    const savedBackground = localStorage.getItem('projectScreenBackground');
    if (savedBackground) {
      projectScreen.style.backgroundImage = `url(${savedBackground})`;
    }
  };
  loadBackgroundFromStorage();

  imagesContainer.addEventListener('click', (event) => {
    const clickedElement = event.target;
    if (clickedElement.classList.contains('img-background-style')) {
      selectedImageSrc = clickedElement.getAttribute('src');
      previewImage.style.backgroundImage = `url(${selectedImageSrc})`
      allImages.forEach((img) => img.classList.remove('selected'));
      clickedElement.classList.add('selected');
    }
  });
  applyButton.addEventListener('click', () => {
    const currentBackground = previewImage.style.backgroundImage;
    if (currentBackground) {
      const url = currentBackground.match(/url\("?(.*?)"?\)/)[1];
      localStorage.setItem('projectScreenBackground', url);
      projectScreen.style.backgroundImage = `url(${url})`;
    }
  });

  // Navbar
  const profileNavbar = document.querySelector('#my-navbar-profile');
  const dropdownMenu = document.querySelector('#profile-dropdown');
  profileNavbar.addEventListener('click', () => {
    dropdownMenu.classList.toggle('inactive');
  });
  dropdownMenu.addEventListener('click', async (event) => {
    if (!profileNavbar.contains(event.target) && !dropdownMenu.contains(event.target)) {
      dropdownMenu.classList.remove('inactive');
    }
  });
}
