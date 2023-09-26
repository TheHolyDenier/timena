<script setup lang="ts">
import { PropType, ref, watch } from '@vue/runtime-core';
import { InputType } from '~/utils/types/input.type';

const emit = defineEmits<{
  (e: 'on:update', value: string | number | undefined): void;
}>();

const props = defineProps({
  name: { type: String, required: true },
  label: { type: String },
  type: { type: String as PropType<InputType>, default: 'text' },
  value: { type: [String, Number], default: '' },
});

const modelValue = ref(props.value ? props.value : '');

watch(modelValue, (value) => {
  emit('on:update', value);
});
</script>

<template>
  <div class="input">
    <input
      :id="name"
      v-model="modelValue"
      :type="type || 'text'"
      class="input__element"
    />
    <div class="input__trailing-icon">
      <slot name="trailing-icon"></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.input {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-block: 0.5em 1em;

  &__element {
    padding: 1em;
    border: 1px solid lightgrey;
    border-radius: 7px;

    &:hover,
    &:focus-visible {
      border-color: gray;
    }
  }
}
</style>
