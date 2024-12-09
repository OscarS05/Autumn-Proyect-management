import { Navbar } from './navbar.component.js';
import { Aside } from './aside.component.js';
import { Main } from './main.component.js';

const projectData = {
  lists: [
    {
      title: 'To Do',
      cards: [
        { title: 'Task 1' },
        { title: 'Task 2' },
      ],
    },
    {
      title: 'In Progress',
      cards: [
        { title: 'Task 3' },
      ],
    },
    {
      title: 'Completed',
      cards: [
        { title: 'Task 1' },
        { title: 'Task 2' },
      ],
    },
    {
      title: 'Not started',
      cards: [
        { title: 'Task 3' },
      ],
    },
  ],
};

export function renderProjectScreen(root) {
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


  // document.getElementById('create-list-btn').addEventListener('click', () => {
  //   const newList = {
  //     title: 'New List',
  //     cards: [],
  //   };
  //   projectData.lists.push(newList);
  //   renderProjectScreen();
  // });

  // Card & lists
  document.getElementById('lists-cards').addEventListener('click', (event) => {
    if(event.target.classList.contains('add-a-list-button')){
      const listElement = event.target.closest('.list');

      const addANewCardButton = listElement.querySelector('.add-a-list-button');
      const addCardInput = listElement.querySelector('#add-card');
      addANewCardButton.classList.add('inactive');
      addCardInput.classList.remove('inactive');
    }
    if (event.target.classList.contains('close-add-card')) {
      const listElement = event.target.closest('.list');

      const addCardInput = listElement.querySelector('#add-card');
      addCardInput.classList.add('inactive');
      const addANewCardButton = listElement.querySelector('.add-a-list-button');
      addANewCardButton.classList.remove('inactive');
    }
  });

  // Config list & config card
  const listsContainer = document.getElementById('lists-cards');
  listsContainer.addEventListener('click', (event) => {
    const allDropdowns = document.querySelectorAll('.dropdown-list, .dropdown-card');
    allDropdowns.forEach((dropdown) => dropdown.classList.add('inactive'));
    if (event.target.classList.contains('config-list')) {
      const listElement = event.target.closest('.list');
      const dropdown = listElement.querySelector('.dropdown-list');
      console.log(dropdown);
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
      listElement.remove();
      return;
    }
    if (event.target.classList.contains('delete-card-option')) {
      const cardElement = event.target.closest('.cards');
      cardElement.remove();
      return;
    }
  });
  document.addEventListener('click', (event) => {
    if (!event.target.closest('.config-list') && !event.target.closest('.config-card') && !event.target.closest('.dropdown-menu')) {
      const allDropdowns = document.querySelectorAll('.dropdown-list, .dropdown-card');
      allDropdowns.forEach((dropdown) => dropdown.classList.add('inactive'));
    }
  });

  // Change name to lists and cards
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

      const saveTitle = () => {
        const newTitle = input.value.trim() || currentTitle;
        const newTitleElement = document.createElement('h3');
        newTitleElement.classList.add('title-card');
        newTitleElement.textContent = newTitle;

        input.replaceWith(newTitleElement);
      };

      input.addEventListener('blur', saveTitle);
      input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          saveTitle();
        }
      });
    }
  });

  document.getElementById('lists-cards').addEventListener('dblclick', (event) => {
    if (event.target.closest('.cards span')) {
      const cardTitleElement = event.target;
      const currentCardTitle = cardTitleElement.textContent;

      const input = document.createElement('input');
      input.type = 'text';
      input.value = currentCardTitle;
      input.classList.add('edit-title-input');

      cardTitleElement.replaceWith(input);
      input.focus();

      const saveCardTitle = () => {
        const newCardTitle = input.value.trim() || currentCardTitle;
        const newCardTitleElement = document.createElement('span');
        newCardTitleElement.textContent = newCardTitle;

        input.replaceWith(newCardTitleElement);
      };
      input.addEventListener('blur', saveCardTitle);
      input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          saveCardTitle();
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
  dropdownMenu.addEventListener('click', (event) => {
    if (!profileNavbar.contains(event.target) && !dropdownMenu.contains(event.target)) {
      dropdownMenu.classList.remove('inactive');
    }
  });
}
