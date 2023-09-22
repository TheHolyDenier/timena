import { useBaseService } from '~/services/base.service';
import { FormDataInterface } from '~/interfaces/form-data.interface';
import { ProjectDto } from '~/models/projects/project.dto';
import { CreateProjectDto } from '~/models/projects/create-project.dto';
import { UpdateProjectDto } from '~/models/projects/update-project.dto';

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
