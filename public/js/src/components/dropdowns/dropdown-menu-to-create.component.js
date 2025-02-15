export function DropdownMenuToCreate() {
  return `
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
  `;
}
