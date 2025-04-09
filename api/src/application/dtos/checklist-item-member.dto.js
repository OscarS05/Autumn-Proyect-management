class ChecklistItemMemberDto {
  constructor({ id, name, checklistItemId, projectMemberId, addedAt }) {
    this.id = id;
    this.name = name;
    this.checklistItemId = checklistItemId;
    this.projectMemberId = projectMemberId;
    this.addedAt = addedAt;
  }
}

module.exports = ChecklistItemMemberDto;
