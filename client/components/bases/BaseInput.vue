<script setup lang="ts">
import { PropType } from '@vue/runtime-core';

const props = defineProps({
  label: { type: String },
  value: { type: String },
  name: { type: String, required: true },
  disabled: { type: Boolean },
  readonly: { type: Boolean },
  type: { type: String as PropType<'text' | 'password'>, default: 'text' },
});

const modelValue = props.value;
const invalid = undefined;
</script>

<template>
  <label v-if="label" :for="name">
    {{ label }}
  </label>

  <input
    v-model="modelValue"
    :aria-invalid="invalid"
    :disabled="disabled"
    :name="name"
    :placeholder="label"
    :readonly="readonly"
    required
    :type="type"
  />
</template>

<style scoped></style>
