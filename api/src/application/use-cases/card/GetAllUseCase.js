class GetAllUseCase {
  constructor({ cardRepository }) {
    this.cardRepository = cardRepository;
  }

  async execute(listId) {
    return await this.cardRepository.findAll(listId);
  }
}

module.exports = GetAllUseCase;
