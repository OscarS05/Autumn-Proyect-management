class DeleteLabelUseCase {
  constructor({ labelRepository }) {
    this.labelRepository = labelRepository;
  }

  async execute(labelId){
    return await this.labelRepository.delete(labelId);
  }
}

module.exports = DeleteLabelUseCase;
