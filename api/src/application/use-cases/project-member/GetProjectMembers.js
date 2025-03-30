const ProjectMemberDto = require("../../dtos/projectMember.dto");

class GetProjectMembersUseCase {
  constructor({ projectMemberRepository }){
    this.projectMemberRepository = projectMemberRepository;
  }

  async execute(workspaceMemberId){
    const projectMembers = await this.projectMemberRepository.findAll(workspaceMemberId);
    return projectMembers.map(projectMember => ProjectMemberDto.withProject(projectMember));
  }
}

module.exports = GetProjectMembersUseCase;
