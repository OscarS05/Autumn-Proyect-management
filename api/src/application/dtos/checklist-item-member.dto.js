class ChecklistItemMemberDto {
  constructor({ id, checklistItemId, projectMemberId, addedAt }) {
    this.id = id;
    this.checklistItemId = checklistItemId;
    this.projectMemberId = projectMemberId;
    this.addedAt = addedAt;
  }
}

module.exports = ChecklistItemMemberDto;
