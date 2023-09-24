<script setup lang="ts">
import { useProject } from '~/stores/project.store';
import { storeToRefs } from 'pinia';

const $project = useProject();
const { selectedProject } = storeToRefs($project);
</script>

<template>
  <div v-if="selectedProject">
    <BaseImage :src="selectedProject.cover" :alt="selectedProject.title" />
    <h2>{{ selectedProject.title }}</h2>
    <p>{{ selectedProject.summary }}</p>
  </div>
</template>

<style scoped lang="scss"></style>
