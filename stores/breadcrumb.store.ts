import { RouteLocationRaw } from 'vue-router';
import { storeToRefs } from 'pinia';
import { NavigationInterface } from '~/interfaces/navigation.interface';
import { useProject } from '~/stores/project.store';
import { useElement } from '~/stores/element.store';

export const useBreadcrumb = defineStore('breadcrumb', () => {
  const { selectedProject } = storeToRefs(useProject());
  const { selectedElement } = storeToRefs(useElement());

  const navigation = computed<NavigationInterface[]>(() => [
    {
      name: 'index',
      icon: 'wood-cabin',
      getTo: () => ({ name: 'index' }),
    },
    {
      name: 'projects-projectId',
      label:
        selectedProject.value?.title || selectedElement.value?.project?.title,
      getTo:
        selectedProject.value || selectedElement.value
          ? (): RouteLocationRaw => ({
              name: 'projects-projectId',
              params: {
                projectId:
                  selectedProject.value?.id || selectedElement.value?.projectId,
              },
            })
          : undefined,
    },
    {
      name: 'projects-projectId-elements-elementId',
      label: selectedElement.value?.name,
      getTo: selectedElement.value
        ? (): RouteLocationRaw => ({
            name: 'projects-projectId-elements-elementId',
            params: {
              projectId: selectedElement.value!.projectId,
              elementId: selectedElement.value!.name,
            },
          })
        : undefined,
    },
  ]);

  return { navigation };
});
