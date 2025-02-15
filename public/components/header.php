<header>

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
