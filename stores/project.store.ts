import { api } from '~/plugins/di';
import { CreateProjectDto } from '~/utils/models/project/create-project.dto';
import { ProjectDto } from '~/utils/models/project/project.dto';

export const useProject = defineStore('project', () => {
  const loading = ref(false);
  const selectedProject = ref<ProjectDto | null>(null);

  const create = async (body: CreateProjectDto) => {
    loading.value = true;
    const project = await api.project.create(body);
    loading.value = false;

    return project;
  };

  const get = async () => {
    loading.value = true;
    const projects = await api.project.get();
    loading.value = false;
    return projects;
  };

  const getOne = async (id: string) => {
    clearSelected();
    loading.value = true;
    selectedProject.value = await api.project.getOne(id);
    loading.value = false;
  };

  const clearSelected = () => {
    selectedProject.value = null;
  };

  return { loading, create, get, getOne, selectedProject };
});
