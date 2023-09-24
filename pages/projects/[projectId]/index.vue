<script setup lang="ts">
import { useProject } from '~/stores/project.store';
import { storeToRefs } from 'pinia';
import BodyLayout from '~/layouts/body-layout.vue';
import { RouteLocationRaw } from 'vue-router';
import { Tabs } from '~/utils/interfaces/tabs.interface';

definePageMeta({
  middleware: ['signed'],
});

const $route = useRoute();
const $project = useProject();
const { selectedProject, loading } = storeToRefs($project);
const projectId = computed(() => String($route.params.projectId));

const addElement = computed(
  (): RouteLocationRaw => ({
    name: 'projects-projectId-elements-create',
    params: { projectId: projectId.value },
  })
);

const tabs: Tabs = [
  { name: 'elements', label: 'Elements' },
  { name: 'events', label: 'Events' },
];
</script>

<template>
  <BodyLayout :title="selectedProject?.title">
    <BaseLoader v-if="loading" />
    <div v-else>
      <BaseTabs :tabs="tabs">
        <template #elements>
          <div class="project__item">
            <div class="project__item-nav">
              <h2>Elements</h2>
              <BaseButton :to="addElement" compact>
                <BaseIcon icon="add" />
                Element
              </BaseButton>
            </div>
            <ElementTable :project-id="projectId" />
          </div>
        </template>
        <template #events>
          <div class="project__item">
            <div class="project__item-nav">
              <h2>Events</h2>
              <BaseButton :to="addElement" compact>
                <BaseIcon icon="add" />
                Event
              </BaseButton>
            </div>
            Tata
          </div>
        </template>
      </BaseTabs>
    </div>
  </BodyLayout>
</template>

<style scoped lang="scss">
.project {
  &__item {
  }

  &__item-nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-block-end: 1em;
  }
}
</style>
