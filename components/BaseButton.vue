<script setup lang="ts">
defineProps({
  compact: { type: Boolean },
  outline: { type: Boolean },
  flat: { type: Boolean },
  loading: { type: Boolean },
});
</script>

<template>
  <button
    class="button"
    :class="{ 'button--compact': compact, outline, 'button--flat': flat }"
    :disabled="loading"
  >
    <BaseLoader v-if="loading" size="small" />
    <slot></slot>
  </button>
</template>

<style scoped lang="scss">
@import 'assets/scss/global';

.button {
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.3em;
}
</style>
