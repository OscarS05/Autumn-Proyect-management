
<div class="team-settings-dropdown workspace-settings-dropdown inactive">
    <h4>Settings team</h4>

    <div class="container-settings-delete container-options-dropdown">
        <button class="team-settings-btn settings-workspace-btn buttons-style">Settings</button>

        <div>
            <button class="delete-team-btn delete-workspace-btn buttons-style">Delete team</button>
            
            <div id="confirm-leave-container" class="dropdown-confirm-delete inactive">
                <p>To confirm that you want to delete the team, type it's name:</p>
                <input type="text" class="workspace-name-input" placeholder="Nombre del workspace">

                <div class="container-btns-workspace-settings">
                    <button id="confirm-delete-team" class="buttons-style">Confirm</button>
                    <button id="cancel-delete-team" class="buttons-style">Cancel</button>
                </div>
            </div>
        </div>

        <?php include('includes/leave.php');?>
    </div>

    <div class="team-setting-container workspace-settings-container inactive">
        <input type="text" name="name-team" id="edit-name-team" class="edit-name-settings-team edit-name-settings-workspace edit-workspace" value="Team 1">

        <div class="input-team-owner-container">
            <div id="edit-team-owner" class="edit-team-owner edit-workspace" style="cursor: pointer;">Marcos Turner</div>

            <?php include('includes/team-members.php');?>
        </div>
        
        <div class="line"></div>
        
        <div class="input-team-owner-container">
            <button class="team-members-settings workspace-members-settings buttons-style">Members</button>
            
            <?php include('includes/team-members.php');?>
        </div>
        
        <div class="input-team-owner-container">
            <button id="team-projects-settings-btn" class="team-projects-settings workspace-members-settings buttons-style">Projects</button>
            
            <?php include('includes/projects-list.php');?>
        </div>

        <div class="line"></div>

        <div class="container-btns-workspace-settings">
            <button class="save-changes-btn buttons-style">Save changes</button>

            <button class="cancel-changes-btn buttons-style">Cancel changes</button>
        </div>
    </div>
</div>