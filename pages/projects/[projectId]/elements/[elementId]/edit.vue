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

onMounted(() => $element.selectElement(projectId.value, elementId.value));

watch(elementId, (value) => $element.selectElement(projectId.value, value));

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
      <BaseButton flat compact @click="remove">
        <BaseIcon icon="delete" />Delete
      </BaseButton>
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
