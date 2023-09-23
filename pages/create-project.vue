<script setup lang="ts">
import { InputDefinition } from '~/utils/interfaces/input-definition.interface';
import BodyLayout from '~/layouts/body-layout.vue';
import { CreateProjectDto } from '~/utils/models/project/create-project.dto';
import { useProject } from '~/stores/project.store';

definePageMeta({
  middleware: ['signed'],
});

const $project = useProject();
const $router = useRouter();

const inputDefinitions: InputDefinition[] = [
  { name: 'title', label: 'Title', required: true },
  { name: 'summary', label: 'Summary' },
  { name: 'cover', label: 'Cover' },
  { name: 'isFavorite', label: 'Is favorite?', type: 'checkbox' },
];

const createProject = async (createProject: CreateProjectDto) => {
  await $project.create(createProject);
  $router.push('index');
};
</script>

<template>
  <BodyLayout>
    <h1>Create project</h1>
    <BaseForm :input-definitions="inputDefinitions" @on:send="createProject" />
  </BodyLayout>
</template>

<style scoped lang="scss"></style>
