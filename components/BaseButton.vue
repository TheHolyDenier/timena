<script setup lang="ts">
import { PropType } from '@vue/runtime-core';
import { IconType } from '~/utils/types/icon.type';

defineProps({
  compact: { type: Boolean },
  outline: { type: Boolean },
  flat: { type: Boolean },
  loading: { type: Boolean },
  icon: { type: String as PropType<IconType> },
  label: { type: String },
  disabled: { type: Boolean },
});
</script>

<template>
  <button
    class="button"
    :class="{ 'button--compact': compact, outline, 'button--flat': flat }"
    :disabled="loading || disabled"
  >
    <BaseLoader v-if="loading" size="small" />
    <BaseIcon v-if="icon" :icon="icon" />
    <slot>{{ label }}</slot>
  </button>
</template>

<style scoped lang="scss">
@import 'assets/scss/global';

.button {
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.3em;
  height: 30px;
}
</style>
