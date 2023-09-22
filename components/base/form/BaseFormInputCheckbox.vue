<script setup lang="ts">
import { PropType, ref } from 'vue';
import { InputDefinitionInterface } from '~/interfaces/input-definition.interface';
import { InputEventInterface } from '~/interfaces/input-event.interface';

const props = defineProps({
  inputDefinition: {
    type: Object as PropType<InputDefinitionInterface>,
    required: true
  },
  model: { type: Boolean }
});

const inputValue = ref(props.model);

const emit = defineEmits<{
  (e: 'on:change', inputEvent: InputEventInterface): void;
}>();

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
  <fieldset>
    <input
      :id="inputDefinition.name"
      v-model="inputValue"
      :name="inputDefinition.name"
      type="checkbox"
    />

    <BaseFormInputLayout
      :id="inputDefinition.name"
      :label="inputDefinition.label"
      :required="inputDefinition.required"
    >
    </BaseFormInputLayout>
  </fieldset>
</template>

<style scoped lang="scss">
.checkbox {
  display: flex;
  align-items: center;
}
</style>
