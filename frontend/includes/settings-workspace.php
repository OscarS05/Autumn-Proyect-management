
<div class="workspace-settings-dropdown inactive">
    <h4>Settings workspace</h4>

    <div class="container-options-dropdown">
        <button class="settings-workspace-btn buttons-style">Settings</button>

        <div>
            <button class="delete-workspace-btn buttons-style">Delete workspace</button>
            
            <div id="delete-workspace-dropdown" class="dropdown-confirm-delete-workspace inactive">
                <p>To confirm that you want to delete the workspace, type it's name:</p>
                <input type="text" class="workspace-name-input" placeholder="Nombre del workspace">

                <div class="container-btns-workspace-settings">
                    <button id="confirm-delete-button" class="buttons-style">Confirm</button>
                    <button id="cancel-delete-button" class="buttons-style">Cancel</button>
                </div>
            </div>
        </div>
    </div>

    <div class="workspace-settings-container inactive">
        <input type="text" name="name-workspace" id="edit-name-workspace" class="edit-name-settings-workspace edit-workspace" value="Personal workspace">

        <input type="text" name="name-workspace" id="edit-description-workspace" class="edit-description-settings-workspace edit-workspace" value="Description...">

        <div class="line"></div>

        <button class="workspace-members-settings buttons-style">Members</button>

        <div class="line"></div>

        <div class="container-btns-workspace-settings">
            <button class="save-changes-btn buttons-style">Save changes</button>

            <button class="cancel-changes-btn buttons-style">Cancel changes</button>
        </div>
    </div>
</div>