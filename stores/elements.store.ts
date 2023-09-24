import { ElementDto } from '~/utils/models/element/element.dto';
import { api } from '~/plugins/di';
import { CreateElementDto } from '~/utils/models/element/create-element.dto';

export const useElement = defineStore('element', () => {
  const loading = ref(false);
  const selectedElement = ref<ElementDto | null>(null);

  const create = async (body: CreateElementDto) => {
    loading.value = true;
    const element = await api.element.create(body);
    loading.value = false;

    return element;
  };

  const get = async () => {
    loading.value = true;
    const elements = await api.element.get();
    loading.value = false;
    return elements;
  };

  return { loading, selectedElement, create, get };
});
