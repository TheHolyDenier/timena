<script setup lang="ts">
defineProps({ compact: { type: Boolean } });
</script>

<template>
  <button class="button" :class="{ 'button--compact': compact }">
    <slot></slot>
  </button>
</template>

<style scoped lang="scss">
.button {
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.3em;
  padding-block: 5px;
  padding-inline: 10px;
  text-transform: uppercase;

  &--compact {
    width: auto;
  }
}
</style>
