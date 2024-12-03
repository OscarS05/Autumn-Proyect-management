<div class="aside-hidden inactive">

    <div class="container-chevron-right">
        <i class="fa-solid fa-chevron-right" style="color: #3f4547;"></i>
    </div>
    
</div>

<aside id="aside" class="">

    <div class="top-divs inactive">

        <div class="container-workspace-name-aside">
            <div id="university-workspace" class="workspace-aside container-workspace-sidebar-styles">
    
                <div>
    
                    <div id="content-university-workspace" class="content-name-workspace dropdown-workspaces-styles">
    
                        <div class="workspace-letter-style workspace-letter-aside">
                            <span>U</span>
                        </div>
    
                        <div class="name-workspace-sidebar-styles name-workspace-aside">
                            <p>University workspace</p>
                        </div>
                        
                    </div>
                    
                </div>
    
                <div id="chevron-left-aside" class="chevron-left-aside chevron-down">
                    <i class="fa-solid fa-chevron-left chevron-left-aside-icon"></i>
                </div>
    
            </div>
        </div>
    
        <div class="container-projects-settings">
    
            <div id="projects-aside" class="projects-settings-aside content-projects-settings projects-sidebar-styles">
    
                <i class="fa-solid fa-layer-group img-projects-sidebar"></i>
    
                <p>Lobby</p>
                
            </div>
    
            <div>
                <div id="settings-aside" class="button-settings-workspace projects-settings-aside content-projects-settings">
        
                    <i class="fa-solid fa-gear img-settings-sidebar"></i>
        
                    <p>Workspace settings</p>
                </div>

                <?php include('includes/settings-workspace.php'); ?>
            </div>
    
        </div>
    
        <div class="container-your-projects">
    
            <div class="container-title">
    
                <h4 class="h4-aside">Projects</h4>
    
                <div class="content-icons-aside">
    
                    <i class="fa-solid fa-ellipsis i-size-aside ellipsis-projects-aside"></i>
    
                    <i id="img-plus-aside" class="fa-solid fa-plus i-size-aside"></i>
    
                </div>
        
    
            </div>
    
            <ul class="workspaces-sidebar-styles">
    
                <li id="project-semester-4" class="project container-projects-aside container-workspace-sidebar-styles">
    
                    <div>
    
                        <div id="content-semester-4" class="projects-aside dropdown-workspaces-styles">
    
                            <div class="img-semester-4 project-name-img">
                            </div>
                            
                            <div class="name-workspace name-workspace-sidebar-styles">
                                <p>Semester 4</p>
                            </div>
        
                        </div>
    
                    </div>
    
                </li>
    
                <li id="project-final-thesis" class="project container-projects-aside container-workspace-sidebar-styles">
    
                    <div>

                        <div id="content-final-thesis" class="projects-aside dropdown-workspaces-styles">
    
                            <div class="img-final-thesis project-name-img"></div>
    
                            <div class="name-workspace name-workspace-sidebar-styles">
                                <p>Final thesis</p>
                            </div>
                            
                        </div>
                        
                    </div>
    
                </li>
    
            </ul>
    
        </div>

    </div>

    <div class="button-invite-members">
        <button class="invite-members buttons-style button-aside inactive">Invite members to the workspace
            <i class="fa-solid fa-user-plus icon-user-plus" style="color: #ffffff;"></i>
        </button>

        <?php include('includes/modal-add-members.php'); ?>
    </div>
    
</aside>