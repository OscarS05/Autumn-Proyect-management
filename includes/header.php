<header>
    <nav id="navbar">


        <div id="container-navbar-left">

            <div id="container-logo-navbar">
                <img class="logo-navbar" src="assets/images/logoProyecto.png" alt="logo">
                <p>Autumn</p>
            </div>

            <ul id="containernavbar-workspaces-create">
                <li id="conteinernavbar-workspaces">
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

                <div id="container-search-navbar" class="search-style">
                    <!-- <div class="conteiner-img-search" >
                        <img class="magnifying-glass" src="assets/images/search-img.svg" alt="search">
                        <p>Search</p>
                    </div> -->

                    <form action="/search" class="conteiner-img-search">
                        <!-- <label for="navbar-search" class="visually-hidden">Search</label> -->
                        <input type="text" id="navbar-search" placeholder="Search">
                        <button type="submit" class="magnifying-glass"></button>
                    </form>

                </div>

                <div id="notification-navbar">
                    <img class="notification_navbar" src="assets/images/notification.svg" alt="notification">
                </div>

                <div id="info-navbar">
                    <img class="info_navbar" src="assets/images/info.svg" alt="info">
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

            <h4 class="titles-workspaces-dropdown">Your workspaces</h4>
    
            <ul class="container-your-workspaces">

                <!-- Colocar id relacionado con el workspace de la pantalla de workspaces -->
                <li class="container-workspace" id="personal-workspace">

                    <div class="content-personal-workspace workspace-dropdown">
                        
                        <div class="workspace-content">
                            <span>P</span>
                        </div>
                        
                        <div class="name-workspace">
                            <p>Personal workspace</p>
                        </div>

                    </div>
    
                </li>

                <!-- Debajo estarán los demas li si el usuario crea más workspaces -->
                <li class="container-workspace" id="university-workspace">

                    <div class="content-university-workspace workspace-dropdown">

                        <div class="workspace-content">
                            <span>U</span>
                        </div>
                        
                        <div class="name-workspace">
                            <p>University workspace</p>
                        </div>

                    </div>
    
                </li>

            </ul>
    
            <h4 class="titles-workspaces-dropdown">Workspaces where you are a guest</h4>

            <ul id="workspaces-where-youare-aguest" class="container-your-workspaces">

                <!-- Colocar id relacionado con el workspace al que el usuario fue invitado de la pantalla de workspaces -->
                <li class="container-workspace" id="teacher-workspace">

                    <div class="content-teacher-workspace workspace-dropdown">

                        <div class="workspace-content">
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

            <div>

            </div>

        </div>

    </div>
</header>