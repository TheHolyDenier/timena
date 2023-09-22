<script setup lang="ts">
import { ref, watch } from '@vue/runtime-core';

const emit = defineEmits<{
  (e: 'on:update', value: boolean);
}>();

const props = defineProps({
  name: { type: String, required: true },
  label: { type: String },
  value: { type: Boolean },
});

const modelValue = ref(!!props.value);

watch(modelValue, (value) => emit('on:update', value));
</script>

<template>
  <fieldset class="checkbox">
    <input v-model="modelValue" type="checkbox" :id="name" :name="name" />
    <label v-if="label" :for="name">
      {{ label }}
    </label>
  </fieldset>
</template>

<style scoped lang="scss">
.checkbox {
  display: flex;
  align-items: center;
  gap: 0.5em;
  margin: 0;
}
</style>
