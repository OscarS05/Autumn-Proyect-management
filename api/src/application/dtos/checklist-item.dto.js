class ChecklistDto {
  constructor({ id, name, checklistId, isChecked, dueDate, createdAt, assignedMembers, members }) {
    this.id = id;
    this.name = name;
    this.checklistId = checklistId;
    this.isChecked = isChecked;
    this.dueDate = dueDate;
    this.createdAt = createdAt;
    this.assignedMembers = assignedMembers;

    if (Array.isArray(members)) {
      this.members = members.length > 0 ? ChecklistDto.formatMembers(members) : [];
    }
  }

  static formatMembers(members) {
    return members.map(member => ({
      projectMemberId: member.id,
      name: member.workspaceMember?.user?.name ?? null
    }));
  }
}

module.exports = ChecklistDto;
