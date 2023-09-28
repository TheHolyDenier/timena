<script setup lang="ts">
import { PropType } from '@vue/runtime-core';
import { Tabs } from '~/utils/interfaces/tabs.interface';

const props = defineProps({
  tabs: { type: Array as PropType<Tabs[]>, default: () => [] },
});

const $route = useRoute();
const $router = useRouter();

const selectedTab = computed(() => {
  return (
    props.tabs.find((tab) => tab.name === String($route.query.tabs)) ||
    props.tabs[0]
  );
});

const selectTab = (tab: Tabs) => {
  $router.replace({ query: { tabs: tab.name } });
};
</script>

<template>
  <div class="tabs">
    <div class="tabs__header">
      <div
        class="tabs__item"
        :class="{ 'tabs__item--active': selectedTab.name === tab.name }"
        v-for="tab in tabs"
        :key="tab.name"
        @click="selectTab(tab)"
      >
        {{ tab.label }}
      </div>
    </div>
    <div class="tabs__body">
      <slot :name="selectedTab.name"></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import 'assets/scss/global';

.tabs {
  &__header {
    display: flex;
    background-color: $primary-500;
    padding-inline-end: 0.5em;
    border-top-right-radius: 15px;
  }
  &__item {
    padding: 0.5em;
    background-color: white;
    font-weight: bold;
    text-transform: uppercase;
    cursor: pointer;
    opacity: 0.7;

    &--active {
      opacity: 1;
    }
  }

  &__body {
    padding: 1em;
    border: 1px solid $primary-500;
    border-top: 0;
    border-left: 0;
    border-bottom-right-radius: 15px;
  }
}
</style>
