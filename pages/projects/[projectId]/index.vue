<script setup lang="ts">
import { useProject } from '~/stores/project.store';
import { storeToRefs } from 'pinia';
import BodyLayout from '~/layouts/body-layout.vue';

definePageMeta({
  middleware: ['signed'],
});

const $route = useRoute();
const $project = useProject();
const { selectedProject } = storeToRefs($project);
const projectId = computed(() => String($route.params.projectId));

onMounted(() => $project.getOne(projectId.value));
</script>

<template>
  <BodyLayout>
    <pre>{{ JSON.stringify(selectedProject, null, 2) }}</pre>
    <template #right-aside-project>
      <TheProjectSidebar />
    </template>
  </BodyLayout>
</template>

<style scoped lang="scss"></style>
