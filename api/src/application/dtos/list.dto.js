class ListDto {
  constructor({ id, name, projectId, createdAt }) {
    this.id = id;
    this.name = name;
    this.projectId = projectId;
    this.createdAt = createdAt;
  }
}

module.exports = ListDto;
