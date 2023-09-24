<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useUser } from '~/stores/user.store';
import { useProject } from '~/stores/project.store';
import { PropType } from '@vue/runtime-core';
import { RouteLocationRaw } from 'vue-router';

defineProps({
  title: { type: String },
  goBack: { type: Object as PropType<RouteLocationRaw> },
});

const $route = useRoute();
const $project = useProject();

const { me } = storeToRefs(useUser());
const slots = useSlots();

const rightAsideSlots = computed(() => {
  return Object.keys(slots).filter((key) => key.includes('right-aside'));
});

const projectId = computed(() => {
  return String($route.params.projectId);
});

watch(projectId, (value) => $project.selectProject(value));

onMounted(() => $project.selectProject(projectId.value));
</script>

<template>
  <div class="signed">
    <div class="signed__body">
      <div v-if="title || goBack || $slots.actions" class="signed__title">
        <div class="signed__navigation">
          <div>
            <BaseButton v-if="goBack" :to="goBack" flat compact>
              <BaseIcon icon="arrow_back" />Go back
            </BaseButton>
          </div>
          <div class="signed__title-actions">
            <slot name="actions" />
          </div>
        </div>
        <h1>{{ title }}</h1>
      </div>
      <slot />
    </div>
    <div class="signed__right-aside">
      <div v-if="me" class="card card--first-one">
        <ProfileSidebar class="card__content card__content--first-one" />
      </div>
      <div v-if="projectId" class="card">
        <ProjectSidebar class="card__content" />
      </div>
      <template v-if="rightAsideSlots.length">
        <div v-for="key in rightAsideSlots" :key="key" class="card">
          <div>
            <template class="card__content">
              <slot :name="key" />
            </template>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import 'assets/scss/global';

.signed {
  width: 100%;
  display: flex;
  gap: 1em;
  height: 100%;

  &__body {
    flex: 2;
    padding: 1em;
    height: 100%;
  }

  &__title {
    border-bottom: 1px solid $primary-500;
    margin-block-end: 1em;
  }

  &__navigation {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__title-header {
    display: flex;
    gap: 0.5em;
    align-items: center;
  }

  &__title-actions {
    display: flex;
    gap: 0.5em;
  }

  &__right-aside {
    display: flex;
    flex-direction: column;
    gap: 1em;
  }

  .card {
    max-width: 200px;

    &--first-one {
      padding-top: 0;
    }

    &__content {
      margin-inline-end: 0;
      border-right-width: 0;

      &--first-one {
        border-top-width: 0;
      }
    }
  }
}
</style>
