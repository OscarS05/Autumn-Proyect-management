const boom = require('@hapi/boom');

class DeleteListUseCase {
  constructor({ listRepository }) {
    this.listRepository = listRepository;
  }

  async execute(projectId, listId) {
    return await this.listRepository.delete(projectId, listId);
  }
}

module.exports = DeleteListUseCase;
