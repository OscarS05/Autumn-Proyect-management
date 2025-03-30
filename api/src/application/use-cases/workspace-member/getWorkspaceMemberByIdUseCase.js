class GetWorkspaceMemberByIdUseCase {
  constructor({ workspaceMemberRepository }){
    this.workspaceMemberRepository = workspaceMemberRepository;
  }

  async execute(workspaceMemberId){
    return await this.workspaceMemberRepository.findWorkspaceMemberById(workspaceMemberId);
  }
}

module.exports = GetWorkspaceMemberByIdUseCase;
