export function ModifyWorkspace(){
  return `
  <div id="modify-workspace-modal" class="workspace-settings-dropdown inactive">
    <h4>Workspace settings</h4>
    <div class="workspace-settings-container">
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
  `;
}
