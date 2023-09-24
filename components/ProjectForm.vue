<script setup lang="ts">
import { useProject } from '~/stores/project.store';
import { InputDefinition } from '~/utils/interfaces/input-definition.interface';
import { CreateProjectDto } from '~/utils/models/project/create-project.dto';
import { PropType } from '@vue/runtime-core';
import { UpdateProjectDto } from '~/utils/models/project/update-project.dto';
import { ProjectDto } from '~/utils/models/project/project.dto';

const $project = useProject();
const $router = useRouter();

const props = defineProps({ model: { type: Object as PropType<ProjectDto> } });

const inputDefinitions: InputDefinition[] = [
  { name: 'title', label: 'Title', required: true },
  { name: 'summary', label: 'Summary' },
  { name: 'cover', label: 'Cover' },
  { name: 'isFavorite', label: 'Is favorite?', type: 'checkbox' },
];

const createProject = async (createProject: CreateProjectDto) => {
  const result = await $project.create(createProject);
  $router.push({
    name: 'projects-projectId',
    params: { projectId: result.id },
  });
};

const updateProject = async (createProject: UpdateProjectDto) => {
  const result = await $project.update(props.model.id, createProject);
  $router.push({
    name: 'projects-projectId',
    params: { projectId: result.id },
  });
};
</script>

<template>
  <BaseForm
    :input-definitions="inputDefinitions"
    :model="model"
    @on:send="model ? updateProject($event) : createProject($event)"
  />
</template>

<style scoped lang="scss"></style>
