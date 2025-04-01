const ProjectMemberDto = require("../../dtos/projectMember.dto");

class GetMemberByIdUseCase {
  constructor({ projectMemberRepository }){
    this.projectMemberRepository = projectMemberRepository;
  }

  async execute(projectMemberId, projectId){
    const projectMember = await this.projectMemberRepository.findProjectMemberById(projectMemberId, projectId);
    return new ProjectMemberDto(projectMember)
  }
}

module.exports = GetMemberByIdUseCase;
