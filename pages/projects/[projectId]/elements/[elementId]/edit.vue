<script setup lang="ts">
import BodyLayout from '~/layouts/body-layout.vue';
import { useElement } from '~/stores/elements.store';
import { storeToRefs } from 'pinia';

definePageMeta({
  middleware: ['signed'],
});

const $route = useRoute();
const $element = useElement();
const { selectedElement, loading } = storeToRefs($element);

const projectId = computed(() => $route.params.projectId);
const elementId = computed(() => $route.params.elementId);

watch(elementId, (value) => $element.selectElement(projectId.value, value), {
  immediate: true,
});
</script>

<template>
  <BodyLayout
    title="Edit element"
    :go-back="{
      name: 'projects-projectId-elements-elementId',
      params: { projectId: projectId.value, elementId: elementId },
    }"
  >
    <BaseLoader v-if="loading" />
    <ElementForm
      v-else-if="selectedElement"
      :project-id="projectId"
      :model="selectedElement"
    />
  </BodyLayout>
</template>

<style scoped lang="scss"></style>
