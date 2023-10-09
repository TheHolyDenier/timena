<script setup lang="ts">
import BodyLayout from '~/layouts/body-layout.vue';
import { useElement } from '~/stores/elements.store';
import { storeToRefs } from 'pinia';

definePageMeta({
  middleware: ['signed'],
});

const $router = useRouter();
const $route = useRoute();
const $element = useElement();
const { selectedElement, loading } = storeToRefs($element);

const projectId = computed(() => String($route.params.projectId));
const elementId = computed(() => String($route.params.elementId));

const editRoute = computed(() => ({
  name: 'projects-projectId-elements-elementId',
  params: { projectId: projectId.value, elementId: elementId.value },
}));

watch(
  elementId,
  (value) => {
    if (!value) return;
    $element.selectElement(projectId.value, value);
  },
  { immediate: true }
);

const remove = async () => {
  await $element.remove(projectId.value, elementId.value);
  $router.replace({
    name: 'projects-projectId',
    params: { projectId: projectId.value },
  });
};
</script>

<template>
  <BodyLayout title="Edit element" :go-back="editRoute">
    <template #actions>
      <BaseButton compact flat icon="delete" label="Delete" @click="remove" />
    </template>
    <BaseLoader v-if="loading" />
    <ElementForm
      v-else-if="selectedElement"
      :project-id="projectId"
      :model="selectedElement"
    />
  </BodyLayout>
</template>

<style scoped lang="scss"></style>
