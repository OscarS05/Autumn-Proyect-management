<header>
    <nav id="navbar">

        <div id="container-navbar-left">

            <div id="container-logo-navbar">
                <img class="logo-navbar" src="assets/images/logoProyecto.png" alt="logo">
                <p>Autumn</p>
            </div>

            <ul id="container-workspaces-create">
                <li id="content-workspaces-chevron">
                    <div class="workspaces-navbar">
                        Workspaces
                    </div>
                    <div class="chevron-down" id="chevron-down-navbar"></div>
                </li>

                <button class="buttons-style" id="button-create-navbar">Create</button>
            </ul>

        </div>


        <div id="navbar-right">

            <ul>

                <div id="navbar-search" class="search-style">

                    <form action="/search" class="content-search">
                        <!-- <label for="navbar-search" class="visually-hidden">Search</label> -->
                        <input type="text" id="placeholder-search-navbar" placeholder="Search">
                        <button type="submit" class="magnifying-glass"></button>
                    </form>

                </div>

                <div id="notification-navbar">
                    <img class="notification-navbar-img" src="assets/images/notification.svg" alt="notification">
                </div>

                <div id="info-navbar">
                    <img class="info-navbar-img" src="assets/images/info.svg" alt="info">
                </div>

                <div id="profile-navbar-right">
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

                    <div id="content-personal-workspace" class="dropdown-workspaces-styles">
                        
                        <div class="workspace-letter-style">
                            <span>P</span>
                        </div>
                        
                        <div class="name-workspace">
                            <p>Personal workspace</p>
                        </div>

                    </div>
    
                </li>

                <!-- Debajo estarán los demas li si el usuario crea más workspaces -->
                <li class="container-workspace" id="university-workspace">
                        <!-- Cambiar clase del div de los content-workspace -->
                    <div id="content-university-workspace" class="dropdown-workspaces-styles">

                        <div class="workspace-letter-style">
                            <span>U</span>
                        </div>
                        
                        <div class="name-workspace">
                            <p>University workspace</p>
                        </div>

                    </div>
    
                </li>

            </ul>
    
            <h4 class="title-h4">Workspaces where you are a guest</h4>

            <ul id="workspaces-where-youare-aguest" class="container-your-workspaces">

                <!-- Colocar id relacionado con el workspace al que el usuario fue invitado de la pantalla de workspaces -->
                <li class="container-workspace" id="teacher-workspace">

                    <div id="content-teacher-workspace" class="dropdown-workspaces-styles">

                        <div class="workspace-letter-style">
                            <span>T</span>
                        </div>
        
                        <div class="name-workspace">
                            <p>Teacher workspace</p>
                        </div>

                    </div>
    
                </li>
    
            </ul>

        </div>

    </div>

    <div id="dropdown-create" class="inactive">

        <div id="create-a-project" class="content-dropdown-create">

            <div class="content-create">
                
                <div class="title-create">

                    <div class="img-title-create-project"></div>
    
                    <p>Create a project</p>

                </div>

                <p class="description-create">A project is a set of cards arranged in lists. Useful for organizing projects, information or organizing any activity</p>

            </div>

        </div>

        <div id="create-a-workspace" class="content-dropdown-create">

            <div class="content-create">
                
                <div class="title-create">

                    <div class="img-title-create-workspace"></div>
    
                    <p>Create a workspace</p>

                </div>

                <p class="description-create">A workspace is a set of projects and people. Use it to organize your business, your side project, and your plans with family or friends.</p>

            </div>

        </div>

    </div>
</header>