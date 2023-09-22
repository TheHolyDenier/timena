<script setup lang="ts">
import { PropType } from 'vue';
import { InputDefinitionInterface } from '~/interfaces/input-definition.interface';
import { InputEventInterface } from '~/interfaces/input-event.interface';

const props = defineProps({
  inputDefinition: {
    type: Object as PropType<InputDefinitionInterface>,
    required: true
  },
  model: { type: String, default: null }
});

const $emit = defineEmits<{
  (e: 'on:change', inputEvent: InputEventInterface): void;
}>();

const updateValue = (value: string) => {
  $emit('on:change', {
    name: props.inputDefinition.name,
    value
  });
};
</script>

<template>
  <BaseFormInputLayout
    :id="inputDefinition.name"
    :label="inputDefinition.label"
    :required="inputDefinition.required"
  >
    <BaseMarkdown
      :name="inputDefinition.name"
      :input-value="model"
      @on:change="updateValue($event)"
    />
  </BaseFormInputLayout>
</template>

<style scoped lang="scss"></style>
