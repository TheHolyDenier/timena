<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useElement } from '~/stores/element.store';
import HeaderCard from '~/components/HeaderCard.vue';

const $route = useRoute();
const $router = useRouter();
const $element = useElement();

const { selectedElement, loading } = storeToRefs($element);

const selectedElementId = computed(() =>
  $route.params.elementId ? String($route.params.elementId) : null
);

watch(
  () => selectedElementId.value,
  (elementId) => {
    if (!elementId) return;
    $element.getOne(elementId);
  },
  { immediate: true }
);

const remove = async () => {
  await $element.remove(selectedElementId.value!);
  await $router.replace({
    name: 'campaigns-campaignId',
    params: { campaignId: $route.params.campaignId }
  });
};
</script>

<template>
  <div>
    <HeaderCard
      :image="selectedElement?.cover"
      :title="selectedElement?.name"
      :loading="!selectedElement || loading"
      @on:delete="remove"
    />

    <BaseMarkdownViewer
      v-if="selectedElement"
      :name="selectedElement.id"
      :value="selectedElement.description"
      :max-length="0"
    />
  </div>
</template>

<style scoped lang="scss"></style>
