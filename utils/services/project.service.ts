import { useBaseService } from '~/utils/services/base.service';
import { CreateProjectDto } from '~/utils/models/project/create-project.dto';
import { ProjectDto } from '~/utils/models/project/project.dto';
import { UpdateProjectDto } from '~/utils/models/project/update-project.dto';

export const useProjectService = () => {
  const $base = useBaseService<ProjectDto, CreateProjectDto, UpdateProjectDto>(
    ProjectDto,
    CreateProjectDto,
    UpdateProjectDto
  );
  const baseUrl = '/api/secure/projects';
  return {
    create: async (body: FormDataInterface) => $base.create!(baseUrl, body),
    update: async (id: string, body: FormDataInterface) =>
      $base.update!(`${baseUrl}/${id}`, body),
    get: async () => $base.get(baseUrl),
    getOne: async (id: string) => $base.getOne(`${baseUrl}/${id}`),
    remove: async (id: string) => $base.remove(`${baseUrl}/${id}`),
  };
};
