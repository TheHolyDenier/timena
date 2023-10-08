<script setup lang="ts">
import BodyLayout from '~/layouts/body-layout.vue';
import { RouteLocationRaw } from 'vue-router';
import { useElement } from '~/stores/elements.store';
import { storeToRefs } from 'pinia';
import BaseHtmlView from '~/components/BaseHtmlView.vue';

definePageMeta({
  middleware: ['signed'],
});

const $route = useRoute();
const $element = useElement();

const { selectedElement, loading } = storeToRefs($element);

const elementId = computed(() => $route.params.elementId);
const projectId = computed(() => $route.params.projectId);
const goBack: RouteLocationRaw = {
  name: 'projects-projectId',
  params: { projectId: projectId.value },
};

watch(elementId, (value) => {
  $element.selectElement(projectId.value, value);
});

onMounted(() => $element.selectElement(projectId.value, elementId.value));
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
    <div v-else-if="selectedElement" class="card">
      <div class="card__content element__body">
        <BaseImage :src="selectedElement.cover" :alt="selectedElement.name" />
        <div class="element__content">
          <h1 class="element__name">{{ selectedElement.name }}</h1>
          <small>{{ selectedElement.summary }}</small>
          <div class="element__tags">
            <BaseTag v-if="selectedElement.isFavorite" label="Favorite" />
            <BaseTag v-if="selectedElement.exists" label="Exists" />
            <BaseTag
              v-if="selectedElement.type"
              :label="selectedElement.type"
            />
          </div>
          <BaseHtmlView :html-string="selectedElement.description" />
        </div>
      </div>
    </div>
  </BodyLayout>
</template>

<style scoped lang="scss">
.element {
  &__body {
    display: grid;
    grid-template-columns: min-content 1fr;
    gap: 1em;
    align-items: start;
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
  }

  &__name {
    margin: 0;
  }

  &__tags {
    display: flex;
    gap: 0.5em;
  }
}
</style>
