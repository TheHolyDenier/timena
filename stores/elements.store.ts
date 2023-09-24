import { ElementDto } from '~/utils/models/element/element.dto';
import { api } from '~/plugins/di';
import { CreateElementDto } from '~/utils/models/element/create-element.dto';

export const useElement = defineStore('element', () => {
  const loading = ref(false);
  const selectedElement = ref<ElementDto | null>(null);

  const create = async (projectId: string, body: CreateElementDto) => {
    loading.value = true;
    const element = await api.element.create(projectId, body);
    loading.value = false;

    return element;
  };

  const get = async (projectId: string) => {
    loading.value = true;
    const elements = await api.element.get(projectId);
    loading.value = false;
    return elements;
  };

  return { loading, selectedElement, create, get };
});
