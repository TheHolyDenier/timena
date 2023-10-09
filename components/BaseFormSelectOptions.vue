<script setup lang="ts">
import { PropType } from '@vue/runtime-core';
import { OptionDefinition } from '~/utils/interfaces/option-definition.interface';

defineEmits<{ (e: 'on:click', value: string): void }>();

defineProps({
  options: { type: Array as PropType<OptionDefinition[]>, required: true },
  selectedOptions: { type: Array, default: () => [] },
});
</script>

<template>
  <div class="options">
    <div class="options__item options__item--empty" v-if="!options.length">
      No options...
    </div>
    <div
      v-for="option in options"
      :key="option.value"
      class="options__item"
      :class="{
        'options__item--selected': selectedOptions.includes(option.value),
      }"
      @click.stop="$emit('on:click', option.value)"
    >
      <BaseIcon v-if="option.icon" :icon="option.icon" />
      {{ option.label }}
    </div>
  </div>
</template>

<style scoped lang="scss">
@import 'assets/scss/global';

.options {
  position: absolute;
  background: white;
  right: 0;
  left: 0;
  max-height: 300px;
  overflow-y: auto;

  &__item {
    padding: 1em;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.3em;

    &:hover {
      background-color: $primary-neutral;
    }

    &--empty {
      cursor: auto;
      background-color: inherit;
    }

    &--selected {
      background-color: rgba($primary-neutral, 0.2);
    }
  }
}
</style>
