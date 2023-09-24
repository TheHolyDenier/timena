import { useBaseService } from '~/utils/services/base.service';
import { ElementDto } from '~/utils/models/element/element.dto';
import { CreateElementDto } from '~/utils/models/element/create-element.dto';
import { UpdateElementDto } from '~/utils/models/element/update-element.dto';

export const useElementService = () => {
  const $base = useBaseService<ElementDto, CreateElementDto, UpdateElementDto>(
    ElementDto,
    CreateElementDto,
    UpdateElementDto
  );
  const baseUrl = (projectId: string) =>
    `/api/secure/projects/${projectId}/elements`;
  return {
    create: async (projectId: string, body: CreateElementDto) =>
      $base.create!(baseUrl(projectId), body),

    update: async (projectId: string, id: string, body: UpdateElementDto) =>
      $base.update!(`${baseUrl(projectId)}/${id}`, body),

    get: async (projectId: string) => $base.get(baseUrl(projectId)),

    getOne: async (projectId: string, id: string) =>
      $base.getOne(`${baseUrl(projectId)}/${id}`),

    remove: async (projectId: string, id: string) =>
      $base.remove(`${baseUrl(projectId)}/${id}`),
  };
};
