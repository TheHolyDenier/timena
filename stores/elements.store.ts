import { ElementDto } from '~/utils/models/element/element.dto';
import { api } from '~/plugins/di';
import { CreateElementDto } from '~/utils/models/element/create-element.dto';
import { UpdateElementDto } from '~/utils/models/element/update-element.dto';
import { PrismaRequest } from '~/utils/interfaces/prisma-request';

export const useElement = defineStore('element', () => {
  const loading = ref(false);
  const selectedElement = ref<ElementDto | null>(null);

  const create = async (elementId: string, body: CreateElementDto) => {
    loading.value = true;
    const element = await api.element.create(elementId, body);
    loading.value = false;

    return element;
  };

  const get = async (projectId: string, request?: PrismaRequest) => {
    loading.value = true;
    const elements = await api.element.get(projectId, request);
    loading.value = false;
    return elements;
  };

  const selectElement = async (projectId: string, id: string) => {
    clearSelected();

    selectedElement.value = await getOne(projectId, id);
  };

  const getOne = async (projectId: string, id: string) => {
    loading.value = true;
    const result = await api.element.getOne(projectId, id);
    loading.value = false;

    return result;
  };

  const update = async (
    projectId: string,
    id: string,
    body: UpdateElementDto
  ) => {
    loading.value = true;
    const element = await api.element.update(projectId, id, body);
    loading.value = false;

    return element;
  };

  const remove = async (projectId: string, id: string) => {
    loading.value = true;
    await api.element.remove(projectId, id);
    selectedElement.value = null;
    loading.value = false;
  };

  const clearSelected = () => {
    selectedElement.value = null;
  };

  return {
    loading,
    selectedElement,
    selectElement,
    create,
    get,
    getOne,
    update,
    remove,
  };
});
