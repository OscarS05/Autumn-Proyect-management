
    //Elements
export let body = document.querySelector('body');
let logoFunction = () => {
    closeAsideWhite();
    openSidebar();
    openWorkspacesProjectsSidebar();
    asideHidden.classList.add('inactive');
    body.classList.remove('header-aside-black');
    body.classList.add('header-aside-white');
    body.style.overflowY = 'scroll';
    projectScreen.classList.add('inactive');
    mainTeamsList.classList.add('inactive');
    containerProjectScreen.classList.add('inactive');
    containerListOfMembers.classList.add('inactive');
}
const warning = document.getElementById('feature-warning');


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
let openCreateWorkspace = () => {
    createAWorkspaceScreen.classList.remove('inactive');
    containerCreateWorkspaceDiv.classList.add('size-container');
    containerCreateWorkspaceDiv.classList.remove('inactive');
    containerProjectScreen.style.height = '0px';
    containerSidebarYourWorkspaces.style.height = '0px';

    body.style.overflow = 'hidden';
    shadow.classList.remove('inactive');

    if(!containerSidebarYourWorkspaces.classList.contains('inactive')){
        mainTeamsList.classList.add('inactive');
    }
}
let closeCreateWorkspace = () => {
    createAWorkspaceScreen.classList.add('inactive');
    containerCreateWorkspaceDiv.classList.remove('size-container');
    containerCreateWorkspaceDiv.classList.add('inactive');
    containerSidebarYourWorkspaces.style.height = '';
    containerProjectScreen.style.height = '';
    body.style.overflow = '';
    shadow.classList.add('inactive');
}

        // Create a team
let containerCreateTeam = document.querySelector('#container-screen-create-team');
let createATeam = document.querySelector('#create-a-team');
let openCreateTeam = () => {
    containerCreateTeam.classList.remove('inactive');
    createATeam.classList.remove('inactive');
    shadow.classList.remove('inactive');
    containerCreateWorkspaceDiv.classList.add('inactive');
    body.style.overflow = 'hidden';
}
let closeCreateTeam = () => {
    containerCreateTeam.classList.add('inactive');
    createATeam.classList.add('inactive');
    shadow.classList.add('inactive');
    containerCreateWorkspaceDiv.classList.remove('inactive');
    body.style.overflow = 'hidden';
}

        // Workspaces and projects screen (Main)
let containerSidebarYourWorkspaces = document.querySelector('#sidebar-yourWorkspaces');
let yourWorkspacesProjects = document.querySelector('#your-projects');
let containerYourProjects = document.querySelector('.container-your-projects');
let buttonTeams = document.querySelectorAll('.button-team');
let projects = document.querySelectorAll('.project');
let newProject = document.querySelectorAll('.new-project');
let btnMembers = document.querySelectorAll('.btn-members');
let openWorkspacesProjectsSidebar = () => {
    containerYourProjects.classList.remove('inactive');
    containerSidebarYourWorkspaces.style.height = '';
    containerSidebarYourWorkspaces.classList.remove('inactive');
    yourWorkspacesProjects.style.width = '';
    yourWorkspacesProjects.style.margin = '';
}
let closeWorkspacesProjectsSidebar = () => {
    containerYourProjects.classList.add('inactive');
    containerSidebarYourWorkspaces.style.height = '0px';
    containerSidebarYourWorkspaces.classList.add('inactive');
    yourWorkspacesProjects.style.width = '0px';
    yourWorkspacesProjects.style.margin = '0px';
}

    // Sidebar
let sidebar = document.querySelector('#sidebar');
let contentSidebar = document.querySelector('.content-sidebar');
let lobbySidebar = document.querySelector('#lobby-sidebar');
let imgProjectSidebar = document.querySelector('.img-projects-sidebar');
let imgSettingsSidebar = document.querySelector('.img-settings-sidebar');
let projectListLi = document.querySelectorAll('.projects-list');
let openSidebar = () => {
    contentSidebar.classList.remove('inactive');
    sidebar.style.width = '';
    sidebar.style.margin = '';
}
let closeSidebar = () => {
    contentSidebar.classList.add('inactive');
    sidebar.style.width = '0px';
    sidebar.style.margin = '0px';
}
    // Aside
let asideWhite = document.querySelector('#aside');
let projectsAside = document.querySelector('#projects-aside');
let chevronLeftAside = document.querySelector('#chevron-left-aside');
let asideHidden = document.querySelector('.aside-hidden');
let containerChevronRight = document.querySelector('.container-chevron-right');
let imgPlusAside = document.querySelector('#img-plus-aside');
let topDivs = document.querySelector('.top-divs');
let buttonAside = document.querySelector('.button-aside');
let containerProjectScreen = document.querySelector('#background-project-screen');
let openAsideWhite = () => {
    containerProjectScreen.style.display = 'flex';
    containerProjectScreen.classList.remove('inactive');
    buttonAside.classList.remove('inactive');
    buttonAside.style.display = 'flex';
    asideWhite.style.width = '288px';
    topDivs.classList.remove('inactive');
}
let closeAsideWhite = () => {
    buttonAside.classList.add('inactive');
    buttonAside.style.display = 'none';
    asideWhite.style.width = '0px';
    topDivs.classList.add('inactive');
    projectScreen.classList.add('inactive');
}
    // Project screen
let projectScreen = document.querySelector('#project-screen');
let lists = document.querySelectorAll('.lists');
let screenCard = document.querySelector('#screen-card');
let containerScreenCard = document.querySelector('.container-card-screen');
let addAListBtn = document.querySelectorAll('.add-a-list-button');
let openProjectScreen = () => {
    closeWorkspacesProjectsSidebar();
    closeSidebar();
    openAsideWhite();
    containerProjectScreen.style.display = 'flex';
    containerListOfMembers.classList.add('inactive');
    mainTeamsList.classList.add('inactive');
    body.style.overflow = 'hidden';
}
let openCardScreen = () => {
    screenCard.classList.remove('inactive');
    containerScreenCard.classList.remove('inactive');
    containerScreenCard.classList.add('display-flex');
    screenCard.classList.add('display-flex');
    shadow.classList.remove('inactive');
}
        // Card screen
let buttonOptionMembers = document.querySelector('#button-option-members');
let dropdownMembersOption = document.querySelector('#dropdown-members-option');
let buttonOptionLabels = document.querySelector('#button-option-labels');
let dropdownLabelsOption = document.querySelector('#dropdown-labels-option');
let buttonOptionChecklist = document.querySelector('#button-option-checklist');
let dropdownChecklistOption = document.querySelector('#dropdown-checklist-option');
let buttonOptionAttach = document.querySelector('#button-option-attach');
let dropdownAttachOption = document.querySelector('#dropdown-attach-option');
let closeDropdownAttach = document.querySelector('.close-dropdown-attach');
let deleteItemChecklistOption = document.querySelector('.container-delete-item-checklist');
let buttonAddItem = document.querySelector('#button-add-item-checklist');
let nameItem = document.querySelector('#name-text-area');
let containerButtonsNewItem = document.querySelector('.container-buttons-new-item');
let buttonCancelItem = document.querySelector('.button-cancel-item');
let buttonAssignTasks = document.querySelector('.button-assign-task');
let buttonExpirationDate = document.querySelector('.button-expiration-date');
let cancelDatesBtn = document.querySelectorAll('.cancel-dates-btn');
let saveDatesBtn = document.querySelectorAll('.save-dates-btn');
let itemDateButton = document.querySelectorAll('.assign-date-btn');
let itemMembersBtn = document.querySelectorAll('.assign-members-btn');
let items = document.querySelectorAll('.container-right-item-checklist');
let cancelEditItem = document.querySelectorAll('.cancel-edit-item');
let quitAttachment = document.querySelectorAll('.quit-attachment');

// Teams list
let mainTeamsList = document.querySelector('.container-teams-list');
let addTeamButton = document.querySelector('.add-team-button');


// List of members
let containerListOfMembers = document.querySelector('#workspace-members');
let proyectListBtn = document.querySelectorAll('.proyects-btn-in-table');
let permissionsBtn = document.querySelectorAll('.permissions-btn-in-table');

// Leave
let leavesBtn = document.querySelectorAll('.leave-btn');




// Pendientes:
// Al finalizar el backend y luego de salir de trabajos del SENA, REFACTORIZAR todo el código de js, de css. El html solo si es necesario
// Definir que lenguaje de backend usar. Investigar que lenguajes de backend o frameworks son más demandados y con la menor oferta posible
// Eliminar funcionalidades de departamentos en Autumn, en el diseño y en la base de datos


// - Refactorizar código y programarlo todo en componentes reutilizables pensando a futuro los ids e innerText, etc. al tiempo que voy haciendo las funcionalidades con el backend.

// Escribir en tareas en Trello los cursosr que tengo que ver para poder seguir desarrollano el proyecto tanto de js como de backend con python y django





// Arrays
let workspaces = [
    {
        name: "Personal workspace"
    },
    {
        name: "University workspace"
    }
];

if(projectScreen.classList.contains('inactive')){
    body.classList.add('header-aside-white');
}

// feature warning
function featureWarning(event){
    event.preventDefault();
    warning.classList.add('show');

    const hideTimeout = setTimeout(() => {
        warning.classList.remove('show');
    }, 5000);

    warning.addEventListener('mouseenter', () => {
        clearTimeout(hideTimeout);
    });

    warning.addEventListener('mouseleave', () => {
        setTimeout(() => {
            warning.classList.remove('show');
        }, 2000);
    });

    console.log(10);
}

function searches(){
    let searches = document.querySelectorAll('.search');
    searches.forEach(function(search){
        search.addEventListener('click', featureWarning);
    });
}
searches();




// funcionalidad botones workspace y create del NAVBAR
function buttonsNavbar() {
    document.querySelector('#notification-navbar').addEventListener('click', featureWarning);
    document.querySelector('#info-navbar').addEventListener('click', featureWarning);
    document.querySelectorAll('.profile-navbar-right').forEach(function(profile){
        profile.addEventListener('click', featureWarning);
    });


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

    });

    document.querySelector('#create-project').addEventListener('click', function(){
        containerDropdownCreate.classList.add('inactive');

        if(!createAProject.classList.contains('inactive')){
            createAProject.classList.add('inactive');
        } else {
            createAProject.classList.remove('inactive');
        }
    });

    containerCreateWorkspace.addEventListener('click', function(){
        openCreateWorkspace();
    });
}
buttonsNavbar();


    // workspace dropdown list
function workspaceDropdownList(){
    let workspace = document.querySelectorAll('.workspace-li');

    workspace.forEach(function(li){
        li.addEventListener('click', function(){
            let projectListDropdown = li.nextElementSibling;

            projectListDropdown.classList.toggle('inactive');
        });
    });
}
workspaceDropdownList();


    // create a project
function dropdownOptionsInputs() {
    selectWorkspace.addEventListener('click', function() {
        if(!optionsInputVisibility.classList.contains('inactive')) {
            optionsInputVisibility.classList.add('inactive');
            optionsInputWorkspace.classList.remove('inactive');
        } else {
            optionsInputWorkspace.classList.toggle('inactive');
        }
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

    iconInfoTypeTeam.addEventListener('mouseenter', function(){
        infoHover.classList.remove('inactive');
    });

    iconInfoTypeTeam.addEventListener('mouseleave', function(){
        infoHover.classList.add('inactive');
    });

    containerCreateWorkspaceDiv.addEventListener('click', function(){
        closeCreateWorkspace();
    });
}
iconsCreateWorkspace();


    // shadow
shadow.addEventListener('click', function(){
    closeCreateTeam();
    closeCreateWorkspace();

    if(body.classList.contains('header-aside-black')){
        screenCard.classList.add('inactive');
        containerScreenCard.style.display = ''
        screenCard.style.display = '';
    }

});




// funcionalidades al dar click en los botones del sidebar
function clickedProjectsSettingsSidebar() {

    if (!yourWorkspacesProjects.classList.contains('inactive')) {
        lobbySidebar.classList.add('clicked');
        imgProjectSidebar.classList.add('clicked');
    }

    projectListLi.forEach(function(li){
        li.addEventListener('click', function(){
            let projectListDropdown = li.querySelector('.project-list-dropdown-container');
            let contentWorkspaceBtn = li.querySelector('.content-workspace-btn');

            projectListDropdown.classList.toggle('inactive');
            contentWorkspaceBtn.classList.toggle('clicked');
        });
    });
}
clickedProjectsSettingsSidebar();



// Workspace and projects screen: Main
function MainWorkspaceFunctions() {
    let settingsWorkspaceBtn = document.querySelectorAll('.button-settings-workspace');
    let projectsBtn = document.querySelectorAll('.projects-btn');

    let seeClosedWorkspacesBtn = document.querySelector('#closed-projects-button');
    seeClosedWorkspacesBtn.addEventListener('click', featureWarning);

    buttonTeams.forEach(function(btn){
        btn.addEventListener('click', function(){
            openAsideWhite();
            closeSidebar();
            closeWorkspacesProjectsSidebar();
            containerListOfMembers.classList.add('inactive');
            mainTeamsList.classList.remove('inactive');
            body.style.overflowY = 'hidden';
        });
    });

    projects.forEach(function(project) {
        project.addEventListener('click', function(){
            body.classList.add('header-aside-black');
            openProjectScreen();
            projectScreen.classList.remove('inactive');
        });
    });

    newProject.forEach(function(btn){
        btn.addEventListener('click', function(){
            if(containerDropdownCreate.classList.contains('inactive')){
                createAProject.classList.remove('inactive');
                createButtonNavbar.classList.add('clicked');
            } else {
                containerDropdownCreate.classList.add('inactive')
                createAProject.classList.remove('inactive');
                createButtonNavbar.classList.add('clicked');
            }
        });
    });

    settingsWorkspaceBtn.forEach(function(btn){
       btn.addEventListener('click', function(event){
        let settingsWorkspaceDropdown = btn.nextElementSibling;
        let confirmDelete = settingsWorkspaceDropdown.querySelector('.dropdown-confirm-delete-workspace');
        let settings = settingsWorkspaceDropdown.querySelector('.workspace-settings-container');
        let deleteWorkspaceBtn = settingsWorkspaceDropdown.querySelectorAll('.delete-workspace-btn');
        let settingsWorkspaceBtn = settingsWorkspaceDropdown.querySelectorAll('.settings-workspace-btn');
        let cancelDeletionBtn = settingsWorkspaceDropdown.querySelectorAll('#cancel-delete-button');
        let cancelChangsBtn = settingsWorkspaceDropdown.querySelectorAll('.cancel-changes-btn ');
        let closeSettingsDropdown = () => {
            // deleteWorkspaceBtn.classList.remove('inactive');
            // settingsWorkspaceBtn.classList.remove('inactive');
            deleteWorkspaceBtn.forEach(function(btn){
                btn.classList.remove('inactive');
            });
            settingsWorkspaceBtn.forEach(function(btn){
                btn.classList.remove('inactive');
            });
            confirmDelete.classList.add('inactive');
            settingsWorkspaceDropdown.classList.add('inactive');
        }

        settingsWorkspaceDropdown.classList.toggle('inactive');
        // deleteWorkspaceBtn.forEachclassList.remove('inactive');
        // settingsWorkspaceBtn.classList.remove('inactive');
        deleteWorkspaceBtn.forEach(function(btn){
            btn.classList.remove('inactive');
        });
        settingsWorkspaceBtn.forEach(function(btn){
            btn.classList.remove('inactive');
        });
        confirmDelete.classList.add('inactive');
        settings.classList.add('inactive');

        deleteWorkspaceBtn.forEach(function(btn){
            btn.addEventListener('click', function(){
                // deleteWorkspaceBtn.classList.add('inactive');
                // settingsWorkspaceBtn.classList.add('inactive');
                deleteWorkspaceBtn.forEach(function(btn){
                    btn.classList.add('inactive');
                });
                settingsWorkspaceBtn.forEach(function(btn){
                    btn.classList.add('inactive');
                });
                confirmDelete.classList.remove('inactive');
            });
        });

        cancelDeletionBtn.forEach(function(btn){
            btn.addEventListener('click', function(){
                closeSettingsDropdown();
            });
        });

        cancelChangsBtn.forEach(function(btn){
            btn.addEventListener('click', function(){
                closeSettingsDropdown();
            });
        });

        settingsWorkspaceBtn.forEach(function(btn){
            btn.addEventListener('click', function(){
                // deleteWorkspaceBtn.classList.add('inactive');
                deleteWorkspaceBtn.forEach(function(btn){
                    btn.classList.add('inactive');
                });
                settingsWorkspaceBtn.forEach(function(btn){
                    btn.classList.add('inactive');
                });
                settings.classList.remove('inactive');
            });
        });
       });
    });

    btnMembers.forEach(function(btn){
        btn.addEventListener('click', function(){
            closeSidebar();
            closeWorkspacesProjectsSidebar();
            openAsideWhite();
            containerListOfMembers.classList.remove('inactive');
        });
    });
}
MainWorkspaceFunctions();



// Logo function
function logoNavbarFunction() {
    logoNavbar.addEventListener('click', function() {
        logoFunction();
    });
    nameLogo.addEventListener('click', function(){
        logoFunction();
    });
}
logoNavbarFunction();



// Aside
function asideFunctions() {
    let inviteMembersBtn = document.querySelectorAll('.invite-members');

    let menuProjects = document.querySelectorAll('.ellipsis-projects-aside');
    menuProjects.forEach(function(menu){
        menu.addEventListener('click', featureWarning);
    });

    projectsAside.addEventListener('click', function() {
        closeAsideWhite();
        openSidebar();
        openWorkspacesProjectsSidebar();
        logoFunction();
        projectScreen.classList.add('inactive');
    });

    chevronLeftAside.addEventListener('click', function() {
        closeAsideWhite();
        asideHidden.classList.remove('inactive');

        if(body.classList.contains('header-aside-black')){
            projectScreen.classList.remove('inactive');
        }
    });

    containerChevronRight.addEventListener('click', function() {
        openAsideWhite();
        asideHidden.classList.add('inactive');
    });

    imgPlusAside.addEventListener('click', function(){
        createAProject.classList.remove('inactive');
        createButtonNavbar.classList.add('clicked');
    });

    inviteMembersBtn.forEach(function(btn){
        let inviteMembersContainer = btn.nextElementSibling;

        btn.addEventListener('click', function(){
            let inviteMembersModal = inviteMembersContainer.querySelector('.modal-invite-members');
            inviteMembersContainer.classList.remove('inactive');
            inviteMembersModal.classList.remove('inactive');
            containerProjectScreen.style.height = '0px';
            containerSidebarYourWorkspaces.style.height = '0px';
            shadow.classList.remove('inactive');
        });

        window.addEventListener('click', function(event) {
            if (event.target == inviteMembersContainer) {
                inviteMembersContainer.classList.add('inactive');
                shadow.classList.add('inactive');
                containerProjectScreen.style.height = '';
                containerSidebarYourWorkspaces.style.height = '';
            }
        });
    });

}
asideFunctions();



// Project screen
function functionsProjectScreen() {
    let visibilityBtn = document.querySelector('#members-project-icon');
    let projectVisibility = document.querySelector('.options-visibility');
    let menus = document.querySelectorAll('.project-menu');
    menus.forEach(function(menu){
        menu.addEventListener('click', function(){
            let projectSettingsContainer = menu.nextElementSibling;

            projectSettingsContainer.classList.toggle('inactive');
        });
    });

    lists.forEach(function(list){
        list.addEventListener('click', function() {
            openCardScreen();
        });
    });

    visibilityBtn.addEventListener('click', function(){
        projectVisibility.classList.toggle('inactive');
    });

    addAListBtn.forEach(function(btn){
        btn.addEventListener('click', function(){
            // Open sadd card - textarea
            let containerList = btn.parentElement;
            let newCardTextarea = containerList.querySelector('#add-card');

            newCardTextarea.classList.remove('inactive');

            // Close add card - textarea
            let closeContainer = newCardTextarea.querySelector('.close-add-card');
            closeContainer.addEventListener('click', function(){
                newCardTextarea.classList.add('inactive');
            });
        });
    });
}
functionsProjectScreen();


// Card screen
function functionsCardScreen() {
    let ellipsisItemChecklist = document.querySelectorAll('.icon-ellipsis');
    let AllDeleteItemContainer = document.querySelectorAll('.container-delete-item-checklist');
    let allAssignMembers = document.querySelectorAll('.add-members-to-item');
    let allModal = document.querySelectorAll('.modal');

    let editAttachmentBtn = document.querySelectorAll('.attachment-edit');
    let closeEditAttach = document.querySelectorAll('.close-edit-attach');


    // screen card
    let closeScreenCard = document.querySelector('.close-screen-card');
    closeScreenCard.addEventListener('click', function(){
        screenCard.classList.add('inactive');
        containerScreenCard.classList.add('inactive');
        shadow.classList.add('inactive');
    });


    // container right

    buttonOptionMembers.addEventListener('click', function() {

        if(dropdownMembersOption.classList.contains('inactive')){
            dropdownMembersOption.classList.remove('inactive');
            dropdownMembersOption.style.display = 'flex';
        } else {
            dropdownMembersOption.style.display = '';
            dropdownMembersOption.classList.add('inactive');
        }
    });

    buttonOptionLabels.addEventListener('click', function(){
        if(dropdownLabelsOption.classList.contains('inactive')){
            dropdownLabelsOption.classList.remove('inactive');
            dropdownLabelsOption.style.display = 'flex';
        } else {
            dropdownLabelsOption.style.display = '';
            dropdownLabelsOption.classList.add('inactive');
        }
    });

    buttonOptionChecklist.addEventListener('click', function(){
        if(dropdownChecklistOption.classList.contains('inactive')){
            dropdownChecklistOption.classList.remove('inactive');
            dropdownChecklistOption.style.display = 'flex';
        } else {
            dropdownChecklistOption.style.display = '';
            dropdownChecklistOption.classList.add('inactive');
        }
    });

    buttonOptionAttach.addEventListener('click', function(){
        if(dropdownAttachOption.classList.contains('inactive')){
            dropdownAttachOption.classList.remove('inactive');
            dropdownAttachOption.style.display = 'flex';
        } else {
            dropdownAttachOption.style.display = '';
            dropdownAttachOption.classList.add('inactive');
        }
    });

    closeDropdownAttach.addEventListener('click', function(){
        dropdownAttachOption.style.display = '';
        dropdownAttachOption.classList.add('inactive');
    });


    // container left

    ellipsisItemChecklist.forEach(function(ellipsis) {
        ellipsis.addEventListener('click', function(event){
            event.stopPropagation();

            let containerIcons = ellipsis.closest('.container-options-item-checklist');
            let containerDeleteItem = containerIcons.querySelector('.container-delete-item-checklist');

            AllDeleteItemContainer.forEach(function(deleter){
                if(deleter !== containerDeleteItem){
                    deleter.classList.add('inactive');
                }
            });

            allModal.forEach(function(modal){
                if(!modal.classList.contains('inactive')){
                    modal.classList.add('inactive');
                }
            });

            allAssignMembers.forEach(function(assign){
                if(!assign.classList.contains('inactive')){
                    assign.classList.add('inactive');
                }
            });


            if(containerDeleteItem.classList.contains('inactive')) {
                containerDeleteItem.classList.remove('inactive');
            } else if(!containerDeleteItem.classList.contains('inactive')){
                containerDeleteItem.classList.add('inactive');
            }
        });
    });

    buttonAddItem.addEventListener('click', function(){
        nameItem.classList.remove('inactive');
        containerButtonsNewItem.classList.remove('inactive');
        buttonAddItem.classList.add('inactive');
    });

    buttonCancelItem.addEventListener('click', function(){
        nameItem.classList.add('inactive');
        containerButtonsNewItem.classList.add('inactive');
        buttonAddItem.classList.remove('inactive');
        console.log(buttonCancelItem);
    });

    buttonAssignTasks.addEventListener('click', function(){
        let dropdownAssignMembers = document.querySelector('#dropdown-assign-members-items');
        dropdownAssignMembers.classList.toggle('inactive');
    });

    buttonExpirationDate.addEventListener('click', function(event){
        let assignNewDate = buttonExpirationDate.nextElementSibling;
        console.log(assignNewDate);
        assignNewDate.classList.remove('inactive');
    });

    itemDateButton.forEach(function(btn){
        let allDatePicker = document.querySelectorAll('.modal-assign-date');

        btn.addEventListener('click', function(event){
            event.stopPropagation();

            const containerDatePicker = this.nextElementSibling;

            allDatePicker.forEach(function(picker){
                if(picker !== containerDatePicker){
                    picker.classList.add('inactive');
                }
            });

            allAssignMembers.forEach(function(dropdown){
                if(!dropdown.classList.contains('inactive')){
                    dropdown.classList.add('inactive');
                }
            });

            AllDeleteItemContainer.forEach(function(deleter){
                if(!deleter.classList.contains('inactive')){
                    deleter.classList.add('inactive');
                }
            });


            if(containerDatePicker.classList.contains('inactive')) {
                containerDatePicker.classList.remove('inactive');
            } else if(!containerDatePicker.classList.contains('inactive')){
                containerDatePicker.classList.add('inactive');
            }
        });
    });

    itemMembersBtn.forEach(function(btn){
        btn.addEventListener('click', function(event){
            event.stopPropagation();

            const containerAssignMembers = this.nextElementSibling;

            allAssignMembers.forEach(function(dropdown){
                if(dropdown !== containerAssignMembers){
                    dropdown.classList.add('inactive');
                }
            });

            AllDeleteItemContainer.forEach(function(deleter){
                if(!deleter.classList.contains('inactive')){
                    deleter.classList.add('inactive');
                }
            });

            allModal.forEach(function(modal){
                if(!modal.classList.contains('inactive')){
                    modal.classList.add('inactive');
                }
            });


            if(containerAssignMembers.classList.contains('inactive')) {
                containerAssignMembers.classList.remove('inactive');
            } else if(!containerAssignMembers.classList.contains('inactive')){
                containerAssignMembers.classList.add('inactive');
            }

        });
    });


    cancelDatesBtn.forEach(function(btn){
        let initialStartDate = '';
        let initialEndDate = '';

        btn.addEventListener('click', function(){
            const containerDatePicker = this.parentElement;
            const startDate = containerDatePicker.querySelector('.input-start-date');
            const endDate = containerDatePicker.querySelector('.input-end-date');
            const modifyBtn = containerDatePicker.querySelector('.modify-date-btn');

            containerDatePicker.classList.add('inactive');

            if(startDate.disabled == false && !modifyBtn.classList.contains('modifying')){
                startDate.value = initialStartDate;
                endDate.value = initialEndDate;
            } else if(startDate.disabled == true){
                startDate.value = startDate.value;
                endDate.value = endDate.value;
            } else if(modifyBtn.classList.contains('modifying')){
                startDate.value = startDate.value;
                endDate.value = endDate.value;
            }
        });
    });

    saveDatesBtn.forEach(function(btn){
        btn.addEventListener('click', function(){
            const containerDatePicker = this.parentElement;
            const startDate = containerDatePicker.querySelector('.input-start-date');
            const endDate = containerDatePicker.querySelector('.input-end-date');
            const modifyDate = containerDatePicker.querySelector('.modify-date-btn');

            if (startDate.value && endDate.value) {
                containerDatePicker.classList.add('inactive');
                this.classList.add('inactive');
                modifyDate.classList.remove('inactive');
                startDate.disabled = true;
                endDate.disabled = true;
                btn.innerHTML = 'Save';
                modifyDate.classList.remove('modifying');
            } else {
                containerDatePicker.classList.add('inactive');
                btn.innerHTML = 'Save';
                modifyDate.classList.remove('modifying');
            }


            modifyDate.addEventListener('click', function(){
                this.classList.add('inactive');
                this.classList.add('modifying');
                btn.innerHTML = 'Modify';
                btn.classList.remove('inactive');
                startDate.disabled = false;
                endDate.disabled = false;
            });
        });
    });

    items.forEach(function(item){
        let itemsCheck = document.querySelectorAll('.container-right-item-checklist');

        item.addEventListener('click', function(){
            const fullItem = item.closest('.item-checklist');
            const checkboxItem = fullItem.firstElementChild;
            const editItem = item.previousElementSibling;

            itemsCheck.forEach(function(element){
                if(element !== item){
                    let editItems = element.previousElementSibling;
                    let task = element.closest('.container-task');
                    let checkboxes = task.previousElementSibling;

                    element.classList.remove('inactive');
                    editItems.classList.add('inactive');
                    checkboxes.style.alignSelf = '';
                }
            });

            item.classList.toggle('inactive');
            editItem.classList.remove('inactive');
            checkboxItem.style.alignSelf = 'start';
        });
    });

    cancelEditItem.forEach(function(btn){
        btn.addEventListener('click', function(){
            let editItem = btn.closest('.container-edit-item');
            let item = btn.closest('.item-checklist');
            let checkboxItem = item.firstElementChild;
            const itemChecklist = editItem.nextElementSibling;

            editItem.classList.add('inactive');
            itemChecklist.classList.remove('inactive');
            checkboxItem.style.alignSelf = '';
        });
    });


    // Attachments
    quitAttachment.forEach(function(quit){
        quit.addEventListener('click', function(event){
            let attachment = quit.closest('.attachment');
            attachment.classList.add('inactive');
        });
    });

    editAttachmentBtn.forEach(function(btn){
        btn.addEventListener('click', function(event){
            // event.stopPropagation();
            let editAttachment = btn.nextElementSibling;
            editAttachment.classList.toggle('inactive');
        });
    });

    closeEditAttach.forEach(function(close){
        close.addEventListener('click', function(event){
            let editAttachment = close.closest('.edit-attachment');
            editAttachment.classList.add('inactive');
        });
    });


    // Comments
}
functionsCardScreen();



// Teams list
function teamsListFunctions(){
    let optionTeamSettings = document.querySelectorAll('.option-settings-team');

    document.querySelectorAll('.filter-and-sort span').forEach(function(span){
        span.addEventListener('click', featureWarning);
    });

    addTeamButton.addEventListener('click', function(){
        openCreateTeam();
    });

    window.onclick = function(event) {
        if (event.target == containerCreateTeam) {
            closeCreateTeam();
        }
    }

    optionTeamSettings.forEach(function(btn){
        btn.addEventListener('click', function(){
            let settingsTeamDropdown = btn.nextElementSibling;

            // Dropdown team settings
            let settingsTeamBtn = settingsTeamDropdown.querySelector('.team-settings-btn');
            let settingsTeamContainer = settingsTeamDropdown.querySelector('.team-setting-container');

            // Droppdown delete team
            let deleteTeamBtn = settingsTeamDropdown.querySelector('.delete-team-btn');
            let confirmDeleteContainer = deleteTeamBtn.nextElementSibling;

            // Cancel btns
            let cancelDeleteTeam = confirmDeleteContainer.querySelector('#cancel-delete-team');
            let cancelChangesBtn = settingsTeamDropdown.querySelector('.cancel-changes-btn');

            // Team owner
            let teamMembers = settingsTeamDropdown.querySelector('.edit-team-owner');
            let teamMembersDropdown = teamMembers.nextElementSibling;
            let addMembersButton = teamMembersDropdown.querySelector('.add-members-button');

            // Members settings
            let teamMembersSettingsBtn = settingsTeamDropdown.querySelector('.team-members-settings');
            let teamMembersSettingsDropdown = teamMembersSettingsBtn.nextElementSibling;

            // Teams project settings
            let teamProjectSettingsBtn = settingsTeamDropdown.querySelector('#team-projects-settings-btn');
            let teamProjectsSettingsDropdown = teamProjectSettingsBtn.nextElementSibling;

            // Add members
            let addMembersBtn = teamMembersSettingsDropdown.querySelector('.add-members-button');
            let addMembersContainer = teamMembersSettingsDropdown.querySelector('.add-members-container');

            // Add projects
            let addProjectsBtn = teamProjectsSettingsDropdown.querySelector('.add-projects-button');
            let addProjectsContainer = teamProjectsSettingsDropdown.querySelector('.add-projects-container');

            // Leave
            let leaveBtn = settingsTeamDropdown.querySelector('.leave-btn');


            settingsTeamDropdown.classList.toggle('inactive');


            settingsTeamBtn.addEventListener('click', function(){
                settingsTeamDropdown.style.left = '-480%';
                settingsTeamContainer.classList.remove('inactive');
                settingsTeamBtn.classList.add('inactive');
                deleteTeamBtn.classList.add('inactive');
                leaveBtn.classList.add('inactive');
            });

            deleteTeamBtn.addEventListener('click', function(){
                settingsTeamDropdown.style.left = '-405%';
                confirmDeleteContainer.classList.remove('inactive');
                settingsTeamBtn.classList.add('inactive');
                deleteTeamBtn.classList.add('inactive');
                leaveBtn.classList.add('inactive');
            });

            cancelDeleteTeam.addEventListener('click', function(){
                settingsTeamContainer.classList.add('inactive');
                confirmDeleteContainer.classList.add('inactive');
                settingsTeamDropdown.classList.add('inactive');
                settingsTeamDropdown.style.left = '';
                settingsTeamBtn.classList.remove('inactive');
                deleteTeamBtn.classList.remove('inactive');
                leaveBtn.classList.remove('inactive');
            });

            console.log(cancelChangesBtn);
            cancelChangesBtn.addEventListener('click', function(){
                settingsTeamContainer.classList.add('inactive');
                settingsTeamDropdown.classList.add('inactive');
                settingsTeamDropdown.style.left = '';
                settingsTeamBtn.classList.remove('inactive');
                deleteTeamBtn.classList.remove('inactive');
            });

            teamMembers.addEventListener('click', function(){
                teamMembersDropdown.classList.toggle('inactive');
                addMembersButton.classList.add('inactive');
            });

            teamMembersSettingsBtn.addEventListener('click', function(){
                console.log(teamMembersSettingsDropdown);
                teamMembersSettingsDropdown.classList.toggle('inactive');
                console.log(teamMembersSettingsBtn);
            });

            teamProjectSettingsBtn.addEventListener('click', function(){
                teamProjectsSettingsDropdown.classList.toggle('inactive');
            });

            addMembersBtn.addEventListener('click', function(){
                addMembersContainer.classList.toggle('inactive');
            });

            addProjectsBtn.addEventListener('click', function(){
                addProjectsContainer.classList.toggle('inactive');
            });
        });
    });
}
teamsListFunctions();



// List of workspace members
function workspaceMembersScreen(){
    let removeMemberBtn = document.querySelectorAll('.option-delete-member');

    proyectListBtn.forEach(function(btn){
        btn.addEventListener('click', function(){
            let projectListDropdown = btn.nextElementSibling;

            projectListDropdown.classList.toggle('inactive');
        });
    });

    permissionsBtn.forEach(function(btn){
        btn.addEventListener('click', function(){
            let permissionsDropdown = btn.nextElementSibling;
            let switchToAdministratorBtn = permissionsDropdown.querySelector('.switch-to-administrator');
            let confirmSwitchToAdmin = switchToAdministratorBtn.nextElementSibling;
            let cancelSwitchRole = confirmSwitchToAdmin.querySelector('.cancel-switch-role');

            let switchToMemberBtn = permissionsDropdown.querySelector('.switch-to-member');
            let confirmSwitchToMember = switchToMemberBtn.nextElementSibling;
            let cancelSwitch = confirmSwitchToMember.querySelector('.cancel-switch-role');


            permissionsDropdown.classList.toggle('inactive');
            confirmSwitchToAdmin.classList.add('inactive');
            confirmSwitchToMember.classList.add('inactive');


            switchToAdministratorBtn.addEventListener('click', function(){
                confirmSwitchToAdmin.classList.toggle('inactive');
            });

            switchToMemberBtn.addEventListener('click', function(){
                confirmSwitchToMember.classList.toggle('inactive');
            });

            cancelSwitchRole.addEventListener('click', function(){
                confirmSwitchToAdmin.classList.add('inactive');
            });

            cancelSwitch.addEventListener('click', function(){
                confirmSwitchToMember.classList.add('inactive');
            });
        });
    });

    removeMemberBtn.forEach(function(btn){
        btn.addEventListener('click', function(){
            let removeMemberDropdown = btn.nextElementSibling;
            // let confirmRemoveMember = removeMemberDropdown.querySelector('.leave-btn');
            let confirmRemoveMember = removeMemberDropdown.querySelector('.confirm-remove-btn');
            let confirmRemoveContainer = confirmRemoveMember.nextElementSibling;
            let cancelRemoveMember = confirmRemoveContainer.querySelector('.cancel-remove-member');

            removeMemberDropdown.classList.toggle('inactive');
            confirmRemoveContainer.classList.add('inactive');

            confirmRemoveMember.addEventListener('click', function(){
                confirmRemoveContainer.classList.toggle('inactive');
            });

            cancelRemoveMember.addEventListener('click', function(){
                confirmRemoveContainer.classList.add('inactive');
            });
        });
    });

    leavesBtn.forEach(function(btn){
        btn.addEventListener('click', function(){
            // All screens
            let confirmLeave = btn.nextElementSibling;
            confirmLeave.classList.toggle('inactive');
            btn.classList.toggle('inactive');

            // Falta el de abandonar proyecto
            if(!containerListOfMembers.classList.contains('inactive')){
                // Leave in team members
                let containerDropdown = btn.parentElement;
                let confirmRemoveBtn = containerDropdown.querySelector('.confirm-remove-btn');

                containerDropdown.style.width = '550%';
                containerDropdown.style.left = '-435%';
                confirmRemoveBtn.classList.toggle('inactive');
            } else if (!mainTeamsList.classList.contains('inactive')){
                // Leave in team
                let teamSettingsDropdown = btn.closest('.team-settings-dropdown');
                let teamSettingsBtn = teamSettingsDropdown.querySelector('.team-settings-btn');
                let deleteTeamBtn = teamSettingsDropdown.querySelector('.delete-team-btn');

                teamSettingsDropdown.style.width = '450%';
                teamSettingsDropdown.style.left = '-380%';
                teamSettingsBtn.classList.add('inactive');
                deleteTeamBtn.classList.add('inactive');
            } else if (!projectScreen.classList.contains('inactive') && !confirmLeave.classList.contains('inactive')){
                // Leave in projects
                let projectSettingsDropdown = btn.closest('.project-settings-container');
                let updateProjectBackground = projectSettingsDropdown.querySelector('#update-background');

                updateProjectBackground.classList.add('inactive');
            }

        });
    });
}
workspaceMembersScreen();


