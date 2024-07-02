// VARIABLES
    // Navbar
let navbar = document.querySelector('#navbar');
let conteinerWorksChevron = document.querySelector('#content-workspaces-chevron');
let workspacesNavbar = document.querySelector('.workspaces-navbar');
let chevronDownNavbar = document.querySelector('#chevron-down-navbar');
let createButtonNavbar = document.querySelector('#button-create-navbar');
        // Workspaces dropdown list
let containerDropdownWorkspaces = document.querySelector('#dropdown-workspace-list');
        // Dropdown create
let containerDropdownCreate = document.querySelector('#dropdown-create');
    // Sidebar
let contentProjectsSidebar = document.querySelector('#projects-sidebar');
let contentSettingsSidebar = document.querySelector('#settings-sidebar');
let imgProjectSidebar = document.querySelector('.img-projects-sidebar');
let imgSettingsSidebar = document.querySelector('.img-settings-sidebar');



// funcionalidad de los botones workspace y create del NAVBAR
function buttonsNavbar() {

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

}
buttonsNavbar();


// funcionalidad del clicked a color azul en el sidebar
function clickedProjectsSettingsSidebar() {

    contentProjectsSidebar.addEventListener('click', function() {

        if(contentSettingsSidebar.classList.contains('clicked')){
            contentSettingsSidebar.classList.remove('clicked');
            imgSettingsSidebar.classList.remove('clicked');
            contentProjectsSidebar.classList.add('clicked');
            imgProjectSidebar.classList.add('clicked');
        } else {
            this.classList.toggle('clicked');
            imgProjectSidebar.classList.toggle('clicked');
        }

    })

    contentSettingsSidebar.addEventListener('click', function(){

        if(contentProjectsSidebar.classList.contains('clicked')){
            contentProjectsSidebar.classList.remove('clicked');
            imgProjectSidebar.classList.remove('clicked');
            contentSettingsSidebar.classList.add('clicked');
            imgSettingsSidebar.classList.add('clicked');
        } else {
            this.classList.toggle('clicked');
            imgSettingsSidebar.classList.toggle('clicked');
        }

    })

}

clickedProjectsSettingsSidebar();