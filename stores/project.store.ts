import { api } from '~/plugins/di';
import { CreateProjectDto } from '~/utils/models/project/create-project.dto';
import { ProjectDto } from '~/utils/models/project/project.dto';
import { UpdateProjectDto } from '~/utils/models/project/update-project.dto';
import { Request } from '~/utils/interfaces/request';

export const useProject = defineStore('project', () => {
  const loading = ref(false);
  const selectedProject = ref<ProjectDto | null>(null);

  const create = async (body: CreateProjectDto) => {
    loading.value = true;
    const project = await api.project.create(body);
    loading.value = false;

    return project;
  };

  const get = async (request?: Request) => {
    loading.value = true;
    const projects = await api.project.get(request);
    loading.value = false;
    return projects;
  };

  const selectProject = async (id: string) => {
    clearSelected();

    if (!id) return;

    selectedProject.value = await getOne(id);
  };

  const getOne = async (id: string) => {
    loading.value = true;
    const result = await api.project.getOne(id);
    loading.value = false;

    return result;
  };

  const update = async (id: string, body: UpdateProjectDto) => {
    loading.value = true;
    const project = await api.project.update(id, body);
    loading.value = false;

    return project;
  };

  const remove = async (id: string) => {
    loading.value = true;
    await api.project.remove(id);
    selectedProject.value = null;
    loading.value = false;
  };

  const clearSelected = () => {
    selectedProject.value = null;
  };

  return {
    loading,
    selectProject,
    create,
    get,
    getOne,
    selectedProject,
    update,
    remove,
  };
});
