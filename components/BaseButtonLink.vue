<script setup lang="ts">
import { PropType } from '@vue/runtime-core';
import { RouteLocationRaw } from 'vue-router';

defineProps({
  compact: { type: Boolean },
  outline: { type: Boolean },
  to: { type: [String, Object] as PropType<string | RouteLocationRaw> },
  flat: { type: Boolean },
  loading: { type: Boolean },
});
</script>

<template>
  <RouterLink v-if="to" :to="to" class="button button--link">
    <BaseButton
      :compact="compact"
      :outline="outline"
      :flat="flat"
      :loading="loading"
    >
      <slot></slot>
    </BaseButton>
  </RouterLink>
</template>

<style scoped lang="scss">
@import 'assets/scss/global';

.button {
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.3em;
  padding-block: 0;
  padding-inline: 0.3em;
  text-transform: uppercase;
  height: 40px;
  font-weight: bold;

  &--flat {
    background: transparent;
    border: 0;
    color: $primary-500;

    &:focus {
      color: $primary-700;
    }
  }

  &--compact {
    width: auto;
  }

  &--link {
    text-decoration: none;
    width: auto;
    padding: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
