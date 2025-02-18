export function WorkspaceSettingsModal(){
  return `
    <div id="workspace-setting-options" class="workspace-settings-dropdown inactive">
      <h4>Workspace settings</h4>

      <div class="container-options-dropdown">
        <button class="settings-workspace-btn buttons-style">Settings</button>
        <div>
          <button class="delete-workspace-btn buttons-style">Delete workspace</button>
        </div>
      </div>
    </div>
  `;
}
