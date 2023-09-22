<script setup lang="ts">
import { PropType } from '@vue/runtime-core';

defineProps({
  name: { type: String, required: true },
  label: { type: String },
  type: { type: String as PropType<InputType>, default: 'text' },
});
</script>

<template>
  <fieldset class="input">
    <label v-if="label" :for="name">
      {{ label }}
    </label>
    <div class="input__container">
      <input class="input__element" :id="name" :type="type || 'text'" />
      <div class="input__trailing-icon">
        <slot name="trailing-icon"></slot>
      </div>
    </div>
  </fieldset>
</template>

<style scoped lang="scss">
.input {
  &__element {
    margin-bottom: 0;
  }

  &__container {
    position: relative;
  }

  &__trailing-icon {
    position: absolute;
    right: 1em;
    top: 50%;
    transform: translate(0, -50%);
    width: auto;
  }
}
</style>
