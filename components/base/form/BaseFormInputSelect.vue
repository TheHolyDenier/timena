<script setup lang="ts">
import { PropType, ref } from 'vue';
import { InputDefinitionInterface } from '~/interfaces/input-definition.interface';
import { InputEventInterface } from '~/interfaces/input-event.interface';

const props = defineProps({
  inputDefinition: {
    type: Object as PropType<InputDefinitionInterface>,
    required: true
  },
  model: { type: [String, Number], default: null }
});

const emit = defineEmits<{
  (e: 'on:change', inputEvent: InputEventInterface): void;
}>();

const inputValue = ref(props.model || null);

watch(
  () => inputValue.value,
  () => {
    emit('on:change', {
      name: props.inputDefinition.name,
      value: inputValue.value
    });
  }
);
</script>

<template>
  <div v-if="inputDefinition.options">
    <BaseFormInputLayout
      :id="inputDefinition.name"
      :label="inputDefinition.label"
      :required="inputDefinition.required"
    />
    <select
      :id="inputDefinition.name"
      v-model="inputValue"
      :required="inputDefinition.required"
      :multiple="inputDefinition.multiple"
    >
      <option
        v-for="option of inputDefinition.options"
        :key="option.value"
        :value="option.value"
      >
        <BaseIcon v-if="!!option.icon" :icon="option.icon" />
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<style scoped lang="scss"></style>
