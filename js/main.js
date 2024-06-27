// VARIABLES
    // Navbar
let navbar = document.querySelector('#navbar');
let conteinerWorksChevron = document.querySelector('#conteinernavbar-workspaces');
let workspacesNavbar = document.querySelector('.workspaces-navbar');
let chevronDownNavbar = document.querySelector('#chevron-down-navbar');
let createButtonNavbar = document.querySelector('#button-create-navbar');
        // Workspaces dropdown list
let containerDropdownWorkspaces = document.querySelector('#dropdown-workspace-list');
        // Dropdown create
let containerDropdownCreate = document.querySelector('#dropdown-create');


// funcionalidad de los botones workspace y create del NAVBAR
conteinerWorksChevron.addEventListener('click', function() {

    if(!containerDropdownCreate.classList.contains('inactive')){
        containerDropdownCreate.classList.add('inactive');
        createButtonNavbar.classList.remove('clicked');
        conteinerWorksChevron.classList.remove('inactive');
    }

    this.classList.toggle('clicked');
    workspacesNavbar.classList.toggle('clicked');
    chevronDownNavbar.classList.toggle('clicked');
    containerDropdownWorkspaces.classList.toggle('inactive');
});

createButtonNavbar.addEventListener('click', function() {

    if(!conteinerWorksChevron.classList.contains('inactive')){
        containerDropdownWorkspaces.classList.add('inactive');
        workspacesNavbar.classList.remove('clicked');
        chevronDownNavbar.classList.remove('clicked');
        conteinerWorksChevron.classList.remove('clicked');
    }

    this.classList.toggle('clicked');
    containerDropdownCreate.classList.toggle('inactive');
})