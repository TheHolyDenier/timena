<script setup lang="ts">
import { useProject } from '~/stores/project.store';
import { storeToRefs } from 'pinia';

const $project = useProject();
const { selectedProject, loading } = storeToRefs($project);
</script>

<template>
  <BaseLoader v-if="loading" />
  <div v-else-if="selectedProject" class="project">
    <BaseImage
      :src="selectedProject.cover"
      :alt="selectedProject.title"
      aspect-ratio="0"
    />
    <p class="project__title">{{ selectedProject.title }}</p>
    <small>{{ selectedProject.summary }}</small>
    <BaseButtonLink
      outline
      :to="{
        name: 'projects-projectId-edit',
        params: { projectId: selectedProject.id },
      }"
    >
      <BaseIcon icon="edit" />Edit project
    </BaseButtonLink>
  </div>
</template>

<style scoped lang="scss">
.project {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5em;

  &__title {
    font-weight: bold;
  }
}
</style>
