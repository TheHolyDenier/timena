<script setup lang="ts">
import { PropType } from '@vue/runtime-core';
import { Tabs } from '~/utils/interfaces/tabs.interface';

const props = defineProps({
  tabs: { type: Array as PropType<Tabs>, default: () => [] },
});

const selectedTab = ref<Tabs>(props.tabs[0]);
</script>

<template>
  <div class="tabs">
    <div class="tabs__header">
      <div
        class="tabs__item"
        v-for="tab in tabs"
        :key="tab.name"
        @click="selectedTab = tab"
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
    gap: 0.3em;
    background-color: $primary-500;
    padding-inline: 0.3em;
    padding-block-start: 0.3em;
  }
  &__item {
    padding: 0.5em;
    background-color: white;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    font-weight: bold;
    text-transform: uppercase;
    cursor: pointer;
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
