<script setup lang="ts">
import BodyLayout from '~/layouts/body-layout.vue';
import { RouteLocationRaw } from 'vue-router';
import { useElement } from '~/stores/elements.store';
import { storeToRefs } from 'pinia';

definePageMeta({
  middleware: ['signed'],
});

const $route = useRoute();
const $element = useElement();

const { selectedElement, loading } = storeToRefs($element);

const elementId = computed(() => String($route.params.elementId));
const projectId = computed(() => String($route.params.projectId));

const goBack: RouteLocationRaw = {
  name: 'projects-projectId',
  params: { projectId: projectId.value },
};

watch(
  elementId,
  (value) => {
    if (!value) return;
    $element.selectElement(projectId.value!, value);
  },
  { immediate: true }
);
</script>

<template>
  <BodyLayout :go-back="goBack">
    <template #actions>
      <BaseButtonLink
        :to="{
          name: 'projects-projectId-elements-elementId-edit',
          params: { projectId: projectId, elementId: elementId },
        }"
        compact
        outline
      >
        <BaseIcon icon="edit" /> Edit
      </BaseButtonLink>
    </template>

    <BaseLoader v-if="loading" />
    <BaseCard
      v-else-if="selectedElement"
      :cover="selectedElement.cover"
      :description="selectedElement.description"
      :summary="selectedElement.summary"
      :title="selectedElement.name"
    >
      <template #tags>
        <div class="element__tags">
          <BaseTag v-if="selectedElement.isFavorite" label="Favorite" />
          <BaseTag v-if="selectedElement.exists" label="Exists" />
          <BaseTag v-if="selectedElement.type" :label="selectedElement.type" />
        </div>
      </template>
    </BaseCard>
  </BodyLayout>
</template>

<style scoped lang="scss">
.element {
  &__tags {
    display: flex;
    gap: 0.5em;
  }
}
</style>
