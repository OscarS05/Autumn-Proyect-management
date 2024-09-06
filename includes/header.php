<header>
    <nav id="navbar">

        <div id="container-navbar-left">

            <div id="container-logo-navbar">
                <img class="logo-navbar" src="assets/images/logoProyecto.png" alt="logo">
                <p id="name-logo">Autumn</p>
            </div>

            <ul id="container-workspaces-create">
                <li id="content-workspaces-chevron">
                    <div class="workspaces-navbar">
                        Workspaces
                    </div>
                    <i id="chevron-down-navbar" class="fa-solid fa-chevron-down chevron-down"></i>
                </li>

                <button class="buttons-style" id="button-create-navbar">Create</button>
            </ul>

        </div>


        <div id="navbar-right">

            <ul>

                <div id="navbar-search" class="search-style">

                    <form action="/search" class="content-search">
                        <!-- <label for="navbar-search" class="visually-hidden">Search</label> -->
                        <input type="text" id="placeholder-search-navbar" class="search search-styles" placeholder="Search">
                        <i class="fa-solid fa-magnifying-glass magnifying-glass"></i>
                    </form>

                </div>

                <div id="notification-navbar">
                    <i class="fa-solid fa-bell notification-navbar-img"></i>
                </div>

                <div id="info-navbar">
                    <i class="fa-solid fa-circle-info info-navbar-img"></i>
                </div>

                <div class="profile-navbar-right">
                    <div class="profile-navbar">
                        <span>OM</span>
                    </div>
                </div>

            </ul>

        </div>

    </nav>

    <div id="dropdown-workspace-list" class="inactive">

        <div id="content-dropdown-list">

            <h4 class="title-h4">Your workspaces</h4>
    
            <ul class="container-your-workspaces">

                <!-- Colocar id relacionado con el workspace de la pantalla de workspaces -->
                <li class="container-workspace" id="personal-workspace">

                    <div id="content-personal-workspace" class="workspace-li dropdown-workspaces-styles">
                        
                        <div class="workspace-letter-style">
                            <span>P</span>
                        </div>
                        
                        <div class="name-workspace">
                            <p>Personal workspace</p>
                        </div>

                    </div>

                    <div class="project-list-dropdown-container inactive">
                        <div id="content-family-project" class="dropdown-workspace dropdown-workspaces-styles">
                            <div class="img-semester-4 project-name-img"></div>

                            <div class="name-workspace name-workspace-sidebar-styles">
                                <p>Family project</p>
                            </div>
                        </div>
                    </div>    
                </li>

                <!-- Debajo estarán los demas li si el usuario crea más workspaces -->

                <li class="container-workspace" id="university-workspace">
                        <!-- Cambiar clase del div de los content-workspace -->
                    <div id="content-university-workspace" class="workspace-li dropdown-workspaces-styles">

                        <div class="workspace-letter-style">
                            <span>U</span>
                        </div>
                        
                        <div class="name-workspace">
                            <p>University workspace</p>
                        </div>

                    </div>
    
                    <div class="project-list-dropdown-container inactive">
                        <div id="content-final-thesis" class="dropdown-workspace dropdown-workspaces-styles">

                            <div class="img-final-thesis project-name-img"></div>

                            <div class="name-workspace name-workspace-sidebar-styles">
                                <p>Final thesis</p>
                            </div>
                        
                        </div>
                    </div>
                </li>

            </ul>
    
            <h4 class="title-h4">Workspaces where you are a guest</h4>

            <ul id="workspaces-where-youare-aguest" class="container-your-workspaces">

                <!-- Colocar id relacionado con el workspace al que el usuario fue invitado de la pantalla de workspaces -->
                <li class="container-workspace" id="teacher-workspace">

                    <div id="content-teacher-workspace" class="workspace-li dropdown-workspaces-styles">

                        <div class="workspace-letter-style">
                            <span>T</span>
                        </div>
        
                        <div class="name-workspace">
                            <p>Teacher workspace</p>
                        </div>

                    </div>

                    <div class="project-list-dropdown-container inactive">
                        <div id="content-final-thesis" class="dropdown-workspace dropdown-workspaces-styles">

                            <div class="img-ayllabus project-name-img"></div>

                            <div class="name-workspace name-workspace-sidebar-styles">
                                <p>Syllabus</p>
                            </div>
                        
                        </div>
                    </div>
                </li>
    
            </ul>

        </div>

    </div>

    <div id="dropdown-create" class="inactive">

        <div id="create-project" class="content-dropdown-create">

            <div class="content-create">
                
                <div class="title-create">

                    <i class="fa-brands fa-trello img-title-create-project" style="color: #545c5f;"></i>
                    <p>Create a project</p>

                </div>

                <p class="description-create">A project is a set of cards arranged in lists. Useful for organizing projects, information or organizing any activity</p>

            </div>

        </div>

        <div id="create-workspace" class="content-dropdown-create">

            <div class="content-create">
                
                <div class="title-create">

                    <i class="fa-solid fa-users img-title-create-workspace" style="color: #545c5f;"></i>
    
                    <p>Create a workspace</p>

                </div>

                <p class="description-create">A workspace is a set of projects and people. Use it to organize your business, your side project, and your plans with family or friends.</p>

            </div>

        </div>

    </div>

    <div id="create-a-project" class="inactive">

        <div class="title-create-project">

            <i class="fa-solid fa-chevron-left chevron-left-create-project chevron-down" style="color: #3f4547;"></i>

            <h1 class="h4-create-project">Create a project</h1>

            <i class="fa-solid fa-x x-solid x-create-project" style="color: #3f4547;"></i>

        </div>

        <form id="form-create-projects">

            <div id=input-name-project>

                <label class="labels-create-project" for="name-project">Name of your project:</label>
                <input type="text" id="name-project" name="name-project" class="inputs-create-project" required>

            </div>

            <div id="select-workspace">

                <label class="labels-create-project" for="workspace-input">Workspace:</label>
                <div id="select-workspace-content">

                    <div class="inputs-create-project select-input">

                        <span>Personal workspace</span>
                        <i class="fa-solid fa-chevron-down chevron-down chevron-down-select" style="#363c42"></i>

                    </div>

                    <ul id="options-workspace" class="options inactive">

                        <li class="workspace-options-styles options-style">Personal workspace</li>
                        <li class="workspace-options-styles options-style">University workspace</li>

                    </ul>

                </div>

            </div>

            <div id="select-visibility">

                <label class="labels-create-project" for="workspace-input">Visibility:</label>
                <div id="select-visibility-content">

                    <div class="inputs-create-project select-input">

                        <span>Private</span>
                        <i class="fa-solid fa-chevron-down chevron-down chevron-down-select" style="#363c42"></i>

                    </div>

                    <ul id="options-visibility" class="options inactive">

                        <li class="visibility-options-styles options-style">
                            <i class="fa-solid fa-lock lock-icon" style="color: #3f4547;"></i>
                            
                            <div>
                                <p>Private</p>
                                <p>Only members of the project will be able to see the content of this project.</p>
                            </div>
                        </li>
                        <li class="visibility-options-styles options-style">
                            <i class="fa-solid fa-users users-icon" style="color: #3f4547;"></i>

                            <div>
                                <p>Workspace</p>
                                <p>All members of the "x-workspace" workspace can view and edit this project.</p>
                            </div>
                        </li>

                    </ul>

                </div>

            </div>

            <div id="select-background">

                <span class="labels-create-project">Background:</span>

                <div class="container-images">

                    <img data-bg="bosque-1.png" src="assets/images/bosque-1.png" class="img-background-style" alt="bosque-1">

                    <img data-bg="bosque-2.jpeg" src="assets/images/bosque-2.jpeg" class="img-background-style" alt="bosque-2">
                    
                    <img data-bg="bosque-3.jpeg" src="assets/images/bosque-3.jpeg" class="img-background-style" alt="bosque-3">
                    
                    <img  data-bg="bosque-4.jpeg" src="assets/images/bosque-4.jpeg" class="img-background-style" alt="bosque-4">
                    
                    <img data-bg="bosque-5.jpg" src="assets/images/bosque-5.jpg" class="img-background-style" alt="bosque-5">

                </div>

                <div class="container-preview">

                    <div class="preview-background">
    
                        <img src="assets/images/preview-background.png" class="preview-background-img" alt="preview-background">
    
                    </div>

                </div>
            </div>

        </form>

        <button id="button-create-project" class="buttons-style">Create</button>

    </div>
 
</header>