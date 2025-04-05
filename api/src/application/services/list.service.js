const boom = require('@hapi/boom');

class ListService {
  constructor({ createListUseCase, getAllListsUseCase, getListUseCase, updateListUseCase, deleteListUseCase, checkProjectMembershipByListUseCase }) {
    this.checkProjectMembershipByListUseCase = checkProjectMembershipByListUseCase;
    this.getListUseCase = getListUseCase;
    this.getAllListsUseCase = getAllListsUseCase;
    this.createListUseCase = createListUseCase;
    this.updateListUseCase = updateListUseCase;
    this.deleteListUseCase = deleteListUseCase;
  }

  async create(listData) {
    return await this.createListUseCase.execute(listData);
  }

  async update(projectId, listId, newName) {
    const list = await this.getList(projectId, listId);
    if(!list?.id) throw boom.notFound('The list to be updated was not found');
    return await this.updateListUseCase.execute(listId, newName);
  }

  async delete(projectId, listId){
    const list = await this.getList(projectId, listId);
    if(!list?.id) throw boom.notFound('The list to be deleted was not found');
    return await this.deleteListUseCase.execute(projectId, listId);
  }

  async getList(projectId, listId){
    return await this.getListUseCase.execute(projectId, listId);
  }

  async findAll(projectId){
    return await this.getAllListsUseCase.execute(projectId);
  }

  async projectMembershipByList(userId, listId){
    return await this.checkProjectMembershipByListUseCase.execute(userId, listId);
  }
}

module.exports = ListService;
