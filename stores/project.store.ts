import { api } from '~/plugins/di';
import { FormDataInterface } from '~/interfaces/form-data.interface';
import { ProjectDto } from '~/models/projects/project.dto';

export const useProject = defineStore('project', () => {
  const needsRefresh = ref<number>(Date.now());
  const loading = ref(false);
  const projects = ref<ProjectDto[]>([]);

  const selectedProject = ref<ProjectDto | null>(null);

  const refresh = () => (needsRefresh.value = Date.now());
  const create = async (body: FormDataInterface) => {
    loading.value = true;
    const project = await api.project.create(body);
    loading.value = false;

    refresh();
    return project;
  };

  const get = async () => {
    loading.value = true;
    projects.value = await api.project.get();
    loading.value = false;
  };

  const getOne = async (id: string) => {
    clearSelected();
    loading.value = true;
    selectedProject.value = await api.project.getOne(id);
    loading.value = false;
  };

  const remove = async (id: string) => {
    loading.value = true;
    await api.project.remove(id);
    loading.value = false;
  };

  const update = async (body: FormDataInterface, id: string) => {
    loading.value = true;
    const project = await api.project.update(id, body);
    loading.value = false;
    refresh();
    return project;
  };

  const clearSelected = () => {
    selectedProject.value = null;
  };

  return {
    loading,
    projects,
    selectedProject,
    create,
    update,
    get,
    getOne,
    remove,
    refresh,
    clearSelected,
    needsRefresh,
  };
});
