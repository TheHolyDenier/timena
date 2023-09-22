<script setup lang="ts">
defineProps({ compact: { type: Boolean }, outline: { type: Boolean } });
</script>

<template>
  <button class="button" :class="{ 'button--compact': compact, outline }">
    <slot></slot>
  </button>
</template>

<style scoped lang="scss">
//@import '@picocss/pico/scss/components';

.button {
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.3em;
  padding-block: 0;
  padding-inline: 0.5em;
  text-transform: uppercase;
  height: 40px;

  &--compact {
    width: auto;
  }
}
</style>
