import { useBaseService } from '~/utils/services/base.service';
import { EventDto } from '~/utils/models/event/event.dto';
import { CreateEventDto } from '~/utils/models/event/create-event.dto';
import { UpdateEventDto } from '~/utils/models/event/update-event.dto';

export const useEventService = () => {
  const $base = useBaseService<EventDto, CreateEventDto, UpdateEventDto>(
    EventDto,
    CreateEventDto,
    UpdateEventDto
  );
  const baseUrl = (projectId: string) =>
    `/api/secure/projects/${projectId}/events`;
  return {
    create: async (projectId: string, body: CreateEventDto) =>
      $base.create!(baseUrl(projectId), body),

    update: async (projectId: string, id: string, body: UpdateEventDto) =>
      $base.update!(`${baseUrl(projectId)}/${id}`, body),

    get: async (projectId: string) => $base.get(baseUrl(projectId)),

    getOne: async (projectId: string, id: string) =>
      $base.getOne(`${baseUrl(projectId)}/${id}`),

    remove: async (projectId: string, id: string) =>
      $base.remove(`${baseUrl(projectId)}/${id}`),
  };
};
