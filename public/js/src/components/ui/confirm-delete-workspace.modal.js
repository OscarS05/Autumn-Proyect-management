export function ConfirmDeleteWorkspace(){
  return `
  <div id="confirm-delete-workspace" class="workspace-settings-dropdown inactive">
    <h4>Workspace settings</h4>
    <div id="delete-workspace-dropdown" class="dropdown-confirm-delete-workspace">
      <p>To confirm that you want to delete the workspace, type it's name:</p>
      <input type="text" class="workspace-name-input" placeholder="Nombre del workspace">

      <div class="container-btns-workspace-settings">
        <button id="confirm-delete-button" class="buttons-style">Confirm</button>
        <button id="cancel-delete-button" class="buttons-style">Cancel</button>
      </div>
    </div>
  </div>
  `;
}
