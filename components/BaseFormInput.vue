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
    <div class="input__container">
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
  </div>
</template>

<style scoped lang="scss"></style>
