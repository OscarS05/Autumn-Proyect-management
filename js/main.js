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
let containerCreateWorkspace = document.querySelector('#create-workspace');
        // Create a project
let createAProject = document.querySelector('#create-a-project');
let chevronLeftCreateProject = document.querySelector('.chevron-left-create-project');
let selectWorkspace = document.querySelector('#select-workspace-content');
let optionsInputWorkspace = document.querySelector('#options-workspace');
let selectVisibility = document.querySelector('#select-visibility-content');
let optionsInputVisibility = document.querySelector('#options-visibility');
        // Create a workspace
let containerCreateWorkspaceDiv = document.querySelector('#container-create-workspace');
let createAWorkspaceScreen = document.querySelector('#create-a-workspace');
let selectAddMembers = document.querySelector('.select-add-members');
let laterAddMembers = document.querySelector('.later-add-members');
let shadow = document.querySelector('.shadow');
        // Create a team
let ContainerCreateTeam = document.querySelector('#container-screen-create-team');
        // Workspaces and projects screen (Main)
let containerSidebarYourWorkspaces = document.querySelector('#sidebar-yourWorkspaces');
let yourWorkspacesProjects = document.querySelector('#your-projects');
let containerYourProjects = document.querySelector('.container-your-projects');
let buttonTeams = document.querySelector('#button-teams');
    // Sidebar
let sidebar = document.querySelector('#sidebar');
let contentSidebar = document.querySelector('.content-sidebar');
let contentProjectsSidebar = document.querySelector('#projects-sidebar');
let contentSettingsSidebar = document.querySelector('#settings-sidebar');
let imgProjectSidebar = document.querySelector('.img-projects-sidebar');
let imgSettingsSidebar = document.querySelector('.img-settings-sidebar');
    // Aside
let asideWhite = document.querySelector('#aside');
let projectsAside = document.querySelector('#projects-aside');
let chevronLeftAside = document.querySelector('#chevron-left-aside');
let asideHidden = document.querySelector('.aside-hidden');
let containerChevronRight = document.querySelector('.container-chevron-right');
let imgPlusAside = document.querySelector('#img-plus-aside');




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
    
        if(!containerDropdownCreate.classList.contains('inactive') || !createAProject.classList.contains('inactive')){
            containerDropdownCreate.classList.add('inactive');
            createButtonNavbar.classList.remove('clicked');
            containerWorksChevron.classList.remove('inactive');
            createAProject.classList.add('inactive');
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



    // create a workspace
function iconsCreateWorkspace() {
    let iconInfoTypeTeam = document.querySelector('.info-input-type-team');
    let infoHover = document.querySelector('.info-hover');

    laterAddMembers.addEventListener('click', function(){
        selectAddMembers.style.background = '#F0F0F0';
    });

    containerCreateWorkspace.addEventListener('click', function(){
        createAWorkspaceScreen.classList.remove('inactive');
        containerCreateWorkspaceDiv.classList.add('size-container');
        shadow.classList.remove('inactive');
    });

    shadow.addEventListener('click', function(){
        if(!createAWorkspaceScreen.classList.contains('inactive') || !ContainerCreateTeam.classList.contains('inactive')){
            createAWorkspaceScreen.classList.add('inactive');
            shadow.classList.add('inactive');
        }
    });

    iconInfoTypeTeam.addEventListener('mouseenter', function(){
        infoHover.classList.remove('inactive');
    });

    iconInfoTypeTeam.addEventListener('mouseleave', function(){
        infoHover.classList.add('inactive');
    });
}
iconsCreateWorkspace();



// funcionalidades al dar click en los botones del sidebar
function clickedProjectsSettingsSidebar() {

    if (!yourWorkspacesProjects.classList.contains('inactive')) {
        contentProjectsSidebar.classList.add('clicked');
        imgProjectSidebar.classList.add('clicked');
    }

    contentProjectsSidebar.addEventListener('click', function() {

        if(!yourWorkspacesProjects.classList.contains('inactive')) {
            contentProjectsSidebar.classList.add('clicked');
            imgProjectSidebar.classList.add('clicked');
        }else if(contentSettingsSidebar.classList.contains('clicked')){
            contentSettingsSidebar.classList.remove('clicked');
            imgSettingsSidebar.classList.remove('clicked');
            contentProjectsSidebar.classList.add('clicked');
            imgProjectSidebar.classList.add('clicked');
            projectsHomepage.classList.remove('inactive');
        }else {
            this.classList.toggle('clicked');
            imgProjectSidebar.classList.toggle('clicked');
        }

    });

    contentSettingsSidebar.addEventListener('click', function(){

        if(!yourWorkspacesProjects.classList.contains('inactive')){
            contentSettingsSidebar.classList.remove('clicked');
            imgSettingsSidebar.classList.remove('clicked');
        } else if(contentProjectsSidebar.classList.contains('clicked')){
            contentProjectsSidebar.classList.remove('clicked');
            imgProjectSidebar.classList.remove('clicked');
            contentSettingsSidebar.classList.add('clicked');
            imgSettingsSidebar.classList.add('clicked');
        } else {
            this.classList.toggle('clicked');
            imgSettingsSidebar.classList.toggle('clicked');
        }

    });

}
clickedProjectsSettingsSidebar();



// Workspace and projects screen: Main
function MainWorkspaceFunctions() {

    buttonTeams.addEventListener('click', function(){
        contentSidebar.classList.add('inactive');
        asideWhite.classList.remove('inactive');
        containerYourProjects.classList.add('inactive');
        containerSidebarYourWorkspaces.style.height = '0px';
        sidebar.style.width = '0px';
        sidebar.style.margin = '0px';
        yourWorkspacesProjects.style.width = '0px';
        yourWorkspacesProjects.style.margin = '0px';
    });

}
MainWorkspaceFunctions();



// si se da click al logo, mostrar la página de inicio.
function logoNavbarFunction() {
    logoNavbar.addEventListener('click', function() {
        contentSidebar.classList.remove('inactive');
        asideWhite.classList.add('inactive');
        containerYourProjects.classList.remove('inactive');
        containerSidebarYourWorkspaces.style.height = '';
        sidebar.style.width = '';
        sidebar.style.margin = '';
        yourWorkspacesProjects.style.width = '';
        yourWorkspacesProjects.style.margin = '';
    });
    nameLogo.addEventListener('click', function(){
        contentSidebar.classList.remove('inactive');
        asideWhite.classList.add('inactive');
        containerYourProjects.classList.remove('inactive');
        containerSidebarYourWorkspaces.style.height = '';
        sidebar.style.width = '';
        sidebar.style.margin = '';
        yourWorkspacesProjects.style.width = '';
        yourWorkspacesProjects.style.margin = '';
    });
}
logoNavbarFunction();



// Functionalities of aside
function asideFunctions() {
    projectsAside.addEventListener('click', function() {
        contentSidebar.classList.remove('inactive');
        asideWhite.classList.add('inactive');
        containerYourProjects.classList.remove('inactive');
        containerSidebarYourWorkspaces.style.height = '';
        sidebar.style.width = '';
        sidebar.style.margin = '';
        yourWorkspacesProjects.style.width = '';
        yourWorkspacesProjects.style.margin = '';
    });

    chevronLeftAside.addEventListener('click', function() {
        asideWhite.classList.add('inactive');
        asideHidden.classList.remove('inactive');
    });

    containerChevronRight.addEventListener('click', function() {
        asideWhite.classList.remove('inactive');
        asideHidden.classList.add('inactive');
    });

    imgPlusAside.addEventListener('click', function(){
        createAProject.classList.remove('inactive');
        createButtonNavbar.classList.add('clicked');
    });
}
asideFunctions();