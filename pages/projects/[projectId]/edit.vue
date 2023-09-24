<script setup lang="ts">
import ProjectForm from '~/components/ProjectForm.vue';
import BodyLayout from '~/layouts/body-layout.vue';
import { useProject } from '~/stores/project.store';
import { storeToRefs } from 'pinia';

definePageMeta({
  middleware: ['signed'],
});

const $route = useRoute();
const $router = useRouter();

const projectId = computed(() => String($route.params.projectId));

const $project = useProject();
const { selectedProject, loading } = storeToRefs($project);
onMounted(() => $project.selectProject(projectId.value));

const remove = async () => {
  await $project.remove(projectId.value);
  $router.replace({ name: 'index' });
};
</script>

<template>
  <BodyLayout
    title="Edit Project"
    :go-back="{ name: 'projects-projectId', params: { projectId: projectId } }"
  >
    <template #actions>
      <BaseButton flat compact @click="remove">
        <BaseIcon icon="delete" />Delete
      </BaseButton>
    </template>

    <BaseLoader v-if="loading" />
    <ProjectForm v-else-if="selectedProject" :model="selectedProject" />
  </BodyLayout>
</template>

<style scoped lang="scss"></style>
