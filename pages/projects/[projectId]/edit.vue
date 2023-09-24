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

const projectId = computed(() => $route.params.projectId);

const $project = useProject();
const { selectedProject, loading } = storeToRefs($project);
onMounted(() => $project.getOne(projectId.value));

const remove = async () => {
  await $project.remove(projectId.value);
  $router.replace({ name: 'index' });
};
</script>

<template>
  <BodyLayout>
    <div class="project__nav">
      <BaseButton
        :to="{ name: 'projects-projectId', params: { projectId: projectId } }"
        flat
        compact
      >
        <BaseIcon icon="arrow_back" />Go back
      </BaseButton>
      <BaseButton flat compact @click="remove">
        <BaseIcon icon="delete" />Delete
      </BaseButton>
    </div>
    <h1>Edit project</h1>

    <BaseLoader v-if="loading" />
    <ProjectForm v-else-if="selectedProject" :model="selectedProject" />

    <template #right-aside-project>
      <TheProjectSidebar />
    </template>
  </BodyLayout>
</template>

<style scoped lang="scss">
.project__nav {
  display: flex;
  justify-content: space-between;
}
</style>
