<script setup lang="ts">
import { PropType, ref, watch } from '@vue/runtime-core';
import { InputType } from '~/utils/types/input.type';

const emit = defineEmits<{
  (e: 'on:update', value: string | number | undefined);
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
  <fieldset class="input">
    <label v-if="label" :for="name">
      {{ label }}
    </label>
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
  </fieldset>
</template>

<style scoped lang="scss">
.input {
  margin: 0;
  &__element {
    margin-bottom: 0;
    height: 50px;
    padding: 0.3em;
    display: flex;
    align-items: center;
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
