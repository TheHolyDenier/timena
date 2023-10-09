<script setup lang="ts">
import BaseHtmlView from '~/components/BaseHtmlView.vue';

defineProps({
  title: { type: String, default: '-' },
  cover: { type: String, default: null },
  summary: { type: String, default: null },
  description: { type: String, default: null },
});
</script>

<template>
  <div class="card">
    <div class="card__content">
      <BaseImage :src="cover" :alt="title" />
      <div class="card__body">
        <h1 class="card__name">{{ title }}</h1>
        <small v-if="summary">{{ summary }}</small>
        <slot name="tags"></slot>

        <BaseHtmlView v-if="description" :html-string="description" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card {
  &__content {
    display: grid;
    grid-template-columns: min-content 1fr;
    gap: 1em;
    align-items: start;
  }

  &__body {
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
