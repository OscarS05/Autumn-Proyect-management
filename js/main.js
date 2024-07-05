// VARIABLES
    // Navbar
let navbar = document.querySelector('#navbar');
let logoNavbar = document.querySelector('.logo-navbar');
let nameLogo = document.querySelector('#name-logo');
let containerWorksChevron = document.querySelector('#content-workspaces-chevron');
let workspacesNavbar = document.querySelector('.workspaces-navbar');
let chevronDownNavbar = document.querySelector('#chevron-down-navbar');
let createButtonNavbar = document.querySelector('#button-create-navbar');
        // Workspaces dropdown list
let containerDropdownWorkspaces = document.querySelector('#dropdown-workspace-list');
        // Dropdown create
let containerDropdownCreate = document.querySelector('#dropdown-create');
        // Create a project
let createAProject = document.querySelector('#create-a-project');
let chevronLeftCreateProject = document.querySelector('.chevron-left-create-project');
let selectWorkspace = document.querySelector('#select-workspace-content');
let optionsInputWorkspace = document.querySelector('#options-workspace');
let selectVisibility = document.querySelector('#select-visibility-content');
let optionsInputVisibility = document.querySelector('#options-visibility');
    // Sidebar
let sidebar = document.querySelector('#sidebar');
let contentProjectsSidebar = document.querySelector('#projects-sidebar');
let contentSettingsSidebar = document.querySelector('#settings-sidebar');
let imgProjectSidebar = document.querySelector('.img-projects-sidebar');
let imgSettingsSidebar = document.querySelector('.img-settings-sidebar');
    // Aside
let asideWhite = document.querySelector('#aside');
let buttonProjectsAside = document.querySelector('#projects-sidebar');
    // Projects homepage
let projectsHomepage = document.querySelector('#projects-homepage');



// Arrays
let workspaces = [
    {
        name: "Personal workspace"
    },
    {
        name: "University workspace"
    }
];




// funcionalidad botones workspace y create del NAVBAR 
function buttonsNavbar() {

    containerWorksChevron.addEventListener('click', function() {
    
        if(!containerDropdownCreate.classList.contains('inactive')){
            containerDropdownCreate.classList.add('inactive');
            createButtonNavbar.classList.remove('clicked');
            containerWorksChevron.classList.remove('inactive');
        }
    
        this.classList.toggle('clicked');
        workspacesNavbar.classList.toggle('clicked');
        chevronDownNavbar.classList.toggle('clicked');
        containerDropdownWorkspaces.classList.toggle('inactive');
    });

    createButtonNavbar.addEventListener('click', function() {
    
        if(createAProject.classList.contains('inactive')){
            if(!containerWorksChevron.classList.contains('inactive')){
                containerDropdownWorkspaces.classList.add('inactive');
                workspacesNavbar.classList.remove('clicked');
                chevronDownNavbar.classList.remove('clicked');
                containerWorksChevron.classList.remove('clicked');
            }
        
            this.classList.toggle('clicked');
            containerDropdownCreate.classList.toggle('inactive');
        } else {
            containerDropdownCreate.classList.add('inactive');
            createButtonNavbar.classList.remove('clicked');
            createAProject.classList.add('inactive');
        }

    })

    document.querySelector('#create-project').addEventListener('click', function(){
        containerDropdownCreate.classList.add('inactive');
        createAProject.classList.remove('inactive');
    })

}
buttonsNavbar();

    // create a project
        // dropdown select workspace
function dropdownOptionsInputs() {
    selectWorkspace.addEventListener('click', function() {
        optionsInputWorkspace.classList.toggle('inactive');
    });

    selectVisibility.addEventListener('click', function() {
        optionsInputVisibility.classList.toggle('inactive');
    });

    document.querySelector('.container-images').addEventListener('click', function(event) {
        if (event.target.classList.contains('img-background-style')){
            const bgUrl = event.target.getAttribute('data-bg');
            document.querySelector('.preview-background').style.backgroundImage = `url(./assets/images/${bgUrl})`;
        }
    });
}
        // funcionalidad de los icons chevron left y x-solid
function iconsCreateProject(){
    document.querySelector('.x-create-project').addEventListener('click', function(){
        createAProject.classList.add('inactive');
        createButtonNavbar.classList.remove('clicked')
    })

    chevronLeftCreateProject.addEventListener('click', function(){
        createAProject.classList.add('inactive');
        containerDropdownCreate.classList.remove('inactive');
    });
}
dropdownOptionsInputs();
iconsCreateProject();


// funcionalidad al dar click en los botones del sidebar: clicked a color azul en el sidebar
function clickedProjectsSettingsSidebar() {

    contentProjectsSidebar.addEventListener('click', function() {

        if(contentSettingsSidebar.classList.contains('clicked')){
            contentSettingsSidebar.classList.remove('clicked');
            imgSettingsSidebar.classList.remove('clicked');
            contentProjectsSidebar.classList.add('clicked');
            imgProjectSidebar.classList.add('clicked');
            projectsHomepage.classList.remove('inactive');
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

// si se da click al logo, mostrar la página de inicio.
function logoNavbarFunction() {
    logoNavbar.addEventListener('click', function() {
        if(!asideWhite.classList.contains('inactive')){
            asideWhite.classList.add('inactive');
            sidebar.classList.remove('inactive');
        }
    });
    nameLogo.addEventListener('click', function(){
        if(!asideWhite.classList.contains('inactive')){
            asideWhite.classList.add('inactive');
            sidebar.classList.remove('inactive');
        }
    });
}
logoNavbarFunction();

//Dar click a projects del sidebar
function projects() {
    buttonProjectsAside.addEventListener('click', function(){
        if(projectsHomepage.classList.contains('inactive')){
            projectsHomepage.classList.remove('inactive')
        }
    })
}