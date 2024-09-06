<section id="workspace-members" class="list-of-members list-of-members-styles inactive">
    <div class="content-list-of-workspace-members">
        <div class="container-options-teams-list">
            <div class="container-search-and-filters">
                <div class="search-for-team search-style">
                    <form action="/search" class="content-search">
                        <input type="text" id="placeholder-search-navbar" class="search search-for-team search-styles" placeholder="Search for members">
                        <i class="fa-solid fa-magnifying-glass magnifying-glass"></i>
                    </form>
                </div>
    
                <div class="filter-and-sort">
                    <span>Filter</span>
    
                    <span>Sort</span>
                </div>
            </div>
    
            <div class="container-add-new-team">
                <div class="invite-btn-container button-invite-members">
                    <button class="invite-members invite-members-btn button-aside buttons-style">Invite members
                        <i class="fa-solid fa-user-plus icon-user-plus" style="color: #ffffff;"></i>
                    </button>
    
                    <?php include('includes/modal-add-members.php'); ?>
                </div>
    
                <p>Showing 1-<span>5</span> of <span>5</span></p>
            </div>
        </div>
    
        <section class="container-teams-table">
            <table class="list-of-members-table teams-table">
                <thead>
                    <tr>
                        <th class="th-styles">NAME</th>
                        <th class="th-styles">TEAMS</th>
                        <th class="th-styles">PERMISSIONS IN THE WORKSPACE</th>
                        <th class="th-projects th-styles">PROJECTS</th>
                        <th class="th-styles">   </th>
                    </tr>
                </thead>
    
                <tbody>
                    <tr>
                        <td class="name-member team-owner-td-style">
                            <div class="profile-navbar-right">
                                <div   class="profile-mt profile-navbar">
                                    <span>MT</span>
                                </div>
                            </div>
    
                            Marcos Turner
                        </td>
                        <td class="team-name-in-table">Team 1, Team 2</td>
                        <td class="position-btn-td">
                            <button class="permissions-btn-in-table member-table-btns-styles buttons-style">Administrator</button>
    
                            <div class="permissions-dropdown project-list-dropdown-container inactive">
                                <div class="permissions-dropdown-content dropdown-workspaces-styles">
                                    <div class="switch-permission-container">
                                        <button class="switch-to-administrator dropdown-workspaces-styles dropdown-workspace buttons-style">Switch to administrator</button>
    
                                        <div class="confirm-permission-dropdown project-list-dropdown-container inactive">
                                            <p>Confirm that you want to switch the role:</p>
    
                                            <div class="confirm-switch-btns container-btns-workspace-settings">
                                                <button class="confirm-switch-role buttons-style">Confirm</button>
                                                <button class="cancel-switch-role buttons-style">Cancel</button>
                                            </div>
                                        </div>
                                    </div>
    
                                    <div class="switch-permission-container">
                                        <button class="switch-to-member dropdown-workspaces-styles dropdown-workspace buttons-style">Switch to member</button>
    
                                        <div class="confirm-permission-dropdown project-list-dropdown-container inactive">
                                            <p>Confirm that you want to switch the role:</p>
    
                                            <div class="confirm-switch-btns container-btns-workspace-settings">
                                                <button class="confirm-switch-role buttons-style">Confirm</button>
                                                <button class="cancel-switch-role buttons-style">Cancel</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td class="position-btn-td">
                            <button class="proyects-btn-in-table member-table-btns-styles buttons-style">Semester 4, Final thesis</button>
    
                            <div class="project-list-in-table project-list-dropdown-container inactive">
                                <div class="dropdown-workspace dropdown-workspaces-styles">
    
                                    <div class="img-semester-4 project-name-img"></div>
    
                                    <div class="name-workspace name-workspace-sidebar-styles">
                                        <p>Family project</p>
                                    </div>
                                
                                </div>
                            </div>
                        </td>
                        <td class="td-ellipsis">
                            <i class="fa-solid fa-ellipsis option-delete-member"></i>
    
                            <div class="remove-member-container project-list-dropdown-container inactive">
                                <button class="confirm-remove-btn btn-styles">Delete</button>
    
                                <div class="confirm-remove-dropdown confirm-permission-dropdown project-list-dropdown-container inactive">
                                    <p>Confirm that you want to remove the member from the workspace:</p>
    
                                    <div class="container-btns-workspace-settings">
                                        <button class="confirm-remove-member buttons-style">Confirm</button>
                                        <button class="cancel-remove-member buttons-style">Cancel</button>
                                    </div>
                                </div>
    
                                <?php include('includes/leave.php');?>
                            </div>
                        </td>
                    </tr>
    
                    <tr>
                        <td class="name-member team-owner-td-style">
                            <div class="profile-navbar-right">
                                <div   class="profile-er profile-navbar">
                                    <span>ER</span>
                                </div>
                            </div>
    
                            Elizabeth Ross
                        </td>
                        <td class="team-name-in-table">Finance</td>
                        <td class="position-btn-td">
                            <button class="permissions-btn-in-table member-table-btns-styles buttons-style">Administrator</button>
    
                            <div class="permissions-dropdown project-list-dropdown-container inactive">
                                <div class="permissions-dropdown-content dropdown-workspaces-styles">
                                    <div class="switch-permission-container">
                                        <button class="switch-to-administrator dropdown-workspaces-styles dropdown-workspace buttons-style">Switch to administrator</button>
    
                                        <div class="confirm-permission-dropdown project-list-dropdown-container inactive">
                                            <p>Confirm that you want to switch the role:</p>
    
                                            <div class="confirm-switch-btns container-btns-workspace-settings">
                                                <button class="confirm-switch-role buttons-style">Confirm</button>
                                                <button class="cancel-switch-role buttons-style">Cancel</button>
                                            </div>
                                        </div>
                                    </div>
    
                                    <div class="switch-permission-container">
                                        <button class="switch-to-member dropdown-workspaces-styles dropdown-workspace buttons-style">Switch to member</button>
    
                                        <div class="confirm-permission-dropdown project-list-dropdown-container inactive">
                                            <p>Confirm that you want to switch the role:</p>
    
                                            <div class="confirm-switch-btns container-btns-workspace-settings">
                                                <button class="confirm-switch-role buttons-style">Confirm</button>
                                                <button class="cancel-switch-role buttons-style">Cancel</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td class="position-btn-td">
                            <button class="proyects-btn-in-table member-table-btns-styles buttons-style">Semester 4, Final thesis</button>
    
                            <div class="project-list-in-table project-list-dropdown-container inactive">
                                <div class="dropdown-workspace dropdown-workspaces-styles">
    
                                    <div class="img-semester-4 project-name-img"></div>
    
                                    <div class="name-workspace name-workspace-sidebar-styles">
                                        <p>Family project</p>
                                    </div>
                                
                                </div>
                            </div>
                        </td>
                        <td class="td-ellipsis">
                            <i class="fa-solid fa-ellipsis option-delete-member"></i>
    
                            <div class="remove-member-container project-list-dropdown-container inactive">
                                <button class="confirm-remove-btn btn-styles">Delete</button>
    
                                <div class="confirm-remove-dropdown confirm-permission-dropdown project-list-dropdown-container inactive">
                                    <p>Confirm that you want to remove the member from the workspace:</p>
    
                                    <div class="container-btns-workspace-settings">
                                        <button class="confirm-remove-member buttons-style">Confirm</button>
                                        <button class="cancel-remove-member buttons-style">Cancel</button>
                                    </div>
                                </div>
    
                                <?php include('includes/leave.php');?>
                            </div>
                        </td>
                    </tr>
                    
                    <tr>
                        <td class="name-member team-owner-td-style">
                            <div class="profile-navbar-right">
                                <div   class="profile-xs profile-navbar">
                                    <span>XC</span>
                                </div>
                            </div>
    
                            Xavier Corey
                        </td>
                        <td class="team-name-in-table">Team 3.1</td>
                        <td class="position-btn-td">
                            <button class="permissions-btn-in-table member-table-btns-styles buttons-style">Administrator</button>
    
                            <div class="permissions-dropdown project-list-dropdown-container inactive">
                                <div class="permissions-dropdown-content dropdown-workspaces-styles">
                                    <div class="switch-permission-container">
                                        <button class="switch-to-administrator dropdown-workspaces-styles dropdown-workspace buttons-style">Switch to administrator</button>
    
                                        <div class="confirm-permission-dropdown project-list-dropdown-container inactive">
                                            <p>Confirm that you want to switch the role:</p>
    
                                            <div class="confirm-switch-btns container-btns-workspace-settings">
                                                <button class="confirm-switch-role buttons-style">Confirm</button>
                                                <button class="cancel-switch-role buttons-style">Cancel</button>
                                            </div>
                                        </div>
                                    </div>
    
                                    <div class="switch-permission-container">
                                        <button class="switch-to-member dropdown-workspaces-styles dropdown-workspace buttons-style">Switch to member</button>
    
                                        <div class="confirm-permission-dropdown project-list-dropdown-container inactive">
                                            <p>Confirm that you want to switch the role:</p>
    
                                            <div class="confirm-switch-btns container-btns-workspace-settings">
                                                <button class="confirm-switch-role buttons-style">Confirm</button>
                                                <button class="cancel-switch-role buttons-style">Cancel</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td class="position-btn-td">
                            <button class="proyects-btn-in-table member-table-btns-styles buttons-style">Semester 4, Final thesis</button>
    
                            <div class="project-list-in-table project-list-dropdown-container inactive">
                                <div class="dropdown-workspace dropdown-workspaces-styles">
    
                                    <div class="img-semester-4 project-name-img"></div>
    
                                    <div class="name-workspace name-workspace-sidebar-styles">
                                        <p>Family project</p>
                                    </div>
                                
                                </div>
                            </div>
                        </td>
                        <td class="td-ellipsis">
                            <i class="fa-solid fa-ellipsis option-delete-member"></i>
    
                            <div class="remove-member-container project-list-dropdown-container inactive">
                                <button class="confirm-remove-btn btn-styles">Delete</button>
    
                                <div class="confirm-remove-dropdown confirm-permission-dropdown project-list-dropdown-container inactive">
                                    <p>Confirm that you want to remove the member from the workspace:</p>
    
                                    <div class="container-btns-workspace-settings">
                                        <button class="confirm-remove-member buttons-style">Confirm</button>
                                        <button class="cancel-remove-member buttons-style">Cancel</button>
                                    </div>
                                </div>
    
                                <?php include('includes/leave.php');?>
                            </div>
                        </td>
                    </tr>
    
                    <tr>
                        <td class="name-member team-owner-td-style">
                            <div class="profile-navbar-right">
                                <div   class="profile-jh profile-navbar">
                                    <span>JH</span>
                                </div>
                            </div>
    
                            Jacob Hancok
                        </td>
                        <td class="team-name-in-table">Team 3.2</td>
                        <td class="position-btn-td">
                            <button class="permissions-btn-in-table member-table-btns-styles buttons-style">Administrator</button>
    
                            <div class="permissions-dropdown project-list-dropdown-container inactive">
                                <div class="permissions-dropdown-content dropdown-workspaces-styles">
                                    <div class="switch-permission-container">
                                        <button class="switch-to-administrator dropdown-workspaces-styles dropdown-workspace buttons-style">Switch to administrator</button>
    
                                        <div class="confirm-permission-dropdown project-list-dropdown-container inactive">
                                            <p>Confirm that you want to switch the role:</p>
    
                                            <div class="confirm-switch-btns container-btns-workspace-settings">
                                                <button class="confirm-switch-role buttons-style">Confirm</button>
                                                <button class="cancel-switch-role buttons-style">Cancel</button>
                                            </div>
                                        </div>
                                    </div>
    
                                    <div class="switch-permission-container">
                                        <button class="switch-to-member dropdown-workspaces-styles dropdown-workspace buttons-style">Switch to member</button>
    
                                        <div class="confirm-permission-dropdown project-list-dropdown-container inactive">
                                            <p>Confirm that you want to switch the role:</p>
    
                                            <div class="confirm-switch-btns container-btns-workspace-settings">
                                                <button class="confirm-switch-role buttons-style">Confirm</button>
                                                <button class="cancel-switch-role buttons-style">Cancel</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td class="position-btn-td">
                            <button class="proyects-btn-in-table member-table-btns-styles buttons-style">Semester 4, Final thesis</button>
    
                            <div class="project-list-in-table project-list-dropdown-container inactive">
                                <div class="dropdown-workspace dropdown-workspaces-styles">
    
                                    <div class="img-semester-4 project-name-img"></div>
    
                                    <div class="name-workspace name-workspace-sidebar-styles">
                                        <p>Family project</p>
                                    </div>
                                
                                </div>
                            </div>
                        </td>
                        <td class="td-ellipsis">
                            <i class="fa-solid fa-ellipsis option-delete-member"></i>
    
                            <div class="remove-member-container project-list-dropdown-container inactive">
                                <button class="confirm-remove-btn btn-styles">Delete</button>
    
                                <div class="confirm-remove-dropdown confirm-permission-dropdown project-list-dropdown-container inactive">
                                    <p>Confirm that you want to remove the member from the workspace:</p>
    
                                    <div class="container-btns-workspace-settings">
                                        <button class="confirm-remove-member buttons-style">Confirm</button>
                                        <button class="cancel-remove-member buttons-style">Cancel</button>
                                    </div>
                                </div>
    
                                <?php include('includes/leave.php');?>
                            </div>
                        </td>
                    </tr>
    
                    <tr>
                        <td class="name-member team-owner-td-style">
                            <div class="profile-navbar-right">
                                <div   class="profile-en profile-navbar">
                                    <span>EN</span>
                                </div>
                            </div>
    
                            Ellis Nashe
                        </td>
                        <td class="team-name-in-table">Team 3.3</td>
                        <td class="position-btn-td">
                            <button class="permissions-btn-in-table member-table-btns-styles buttons-style">Administrator</button>
    
                            <div class="permissions-dropdown project-list-dropdown-container inactive">
                                <div class="permissions-dropdown-content dropdown-workspaces-styles">
                                    <div class="switch-permission-container">
                                        <button class="switch-to-administrator dropdown-workspaces-styles dropdown-workspace buttons-style">Switch to administrator</button>
    
                                        <div class="confirm-permission-dropdown project-list-dropdown-container inactive">
                                            <p>Confirm that you want to switch the role:</p>
    
                                            <div class="confirm-switch-btns container-btns-workspace-settings">
                                                <button class="confirm-switch-role buttons-style">Confirm</button>
                                                <button class="cancel-switch-role buttons-style">Cancel</button>
                                            </div>
                                        </div>
                                    </div>
    
                                    <div class="switch-permission-container">
                                        <button class="switch-to-member dropdown-workspaces-styles dropdown-workspace buttons-style">Switch to member</button>
    
                                        <div class="confirm-permission-dropdown project-list-dropdown-container inactive">
                                            <p>Confirm that you want to switch the role:</p>
    
                                            <div class="confirm-switch-btns container-btns-workspace-settings">
                                                <button class="confirm-switch-role buttons-style">Confirm</button>
                                                <button class="cancel-switch-role buttons-style">Cancel</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td class="position-btn-td">
                            <button class="proyects-btn-in-table member-table-btns-styles buttons-style">Semester 4, Final thesis</button>
    
                            <div class="project-list-in-table project-list-dropdown-container inactive">
                                <div class="dropdown-workspace dropdown-workspaces-styles">
    
                                    <div class="img-semester-4 project-name-img"></div>
    
                                    <div class="name-workspace name-workspace-sidebar-styles">
                                        <p>Family project</p>
                                    </div>
                                
                                </div>
                            </div>
                        </td>
                        <td class="td-ellipsis">
                            <i class="fa-solid fa-ellipsis option-delete-member"></i>
                            
                            <div class="remove-member-container project-list-dropdown-container inactive">
                                <button class="confirm-remove-btn btn-styles">Delete</button>
    
                                <div class="confirm-remove-dropdown confirm-permission-dropdown project-list-dropdown-container inactive">
                                    <p>Confirm that you want to remove the member from the workspace:</p>
    
                                    <div class="container-btns-workspace-settings">
                                        <button class="confirm-remove-member buttons-style">Confirm</button>
                                        <button class="cancel-remove-member buttons-style">Cancel</button>
                                    </div>
                                </div>
    
                                <?php include('includes/leave.php');?>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </section>
    </div>
</section>