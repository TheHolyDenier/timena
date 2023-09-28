import { api } from '~/plugins/di';
import { EventDto } from '~/utils/models/event/event.dto';
import { CreateEventDto } from '~/utils/models/event/create-event.dto';
import { UpdateEventDto } from '~/utils/models/event/update-event.dto';

export const useEvent = defineStore('event', () => {
  const loading = ref(false);
  const selectedEvent = ref<EventDto | null>(null);

  const create = async (eventId: string, body: CreateEventDto) => {
    loading.value = true;
    const event = await api.event.create(eventId, body);
    loading.value = false;

    return event;
  };

  const get = async (eventId: string) => {
    loading.value = true;
    const events = await api.event.get(eventId);
    loading.value = false;
    return events;
  };

  const selectEvent = async (projectId: string, id: string) => {
    clearSelected();

    selectedEvent.value = await getOne(projectId, id);
  };

  const getOne = async (projectId: string, id: string) => {
    loading.value = true;
    const result = await api.event.getOne(projectId, id);
    loading.value = false;

    return result;
  };

  const update = async (
    projectId: string,
    id: string,
    body: UpdateEventDto
  ) => {
    loading.value = true;
    const event = await api.event.update(projectId, id, body);
    loading.value = false;

    return event;
  };

  const remove = async (projectId: string, id: string) => {
    loading.value = true;
    await api.event.remove(projectId, id);
    selectedEvent.value = null;
    loading.value = false;
  };

  const clearSelected = () => {
    selectedEvent.value = null;
  };

  return {
    loading,
    selectedEvent,
    selectEvent,
    create,
    get,
    getOne,
    update,
    remove,
  };
});
