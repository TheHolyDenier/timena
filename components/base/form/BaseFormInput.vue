<script setup lang="ts">
import { PropType } from 'vue';
import { InputDefinitionInterface } from '~/interfaces/input-definition.interface';
import { InputEventInterface } from '~/interfaces/input-event.interface';

defineProps({
  inputDefinition: {
    type: Object as PropType<InputDefinitionInterface>,
    required: true
  },
  model: { type: [String, Number, Boolean], default: null }
});

const emit = defineEmits<{
  (e: 'on:change', inputEvent: InputEventInterface): void;
}>();
</script>

<template>
  <BaseFormInputCheckbox
    v-if="inputDefinition.type === 'checkbox'"
    :input-definition="inputDefinition"
    :model="!!model"
    @on:change="emit('on:change', $event)"
  />
  <div v-else>
    <BaseFormInputSelect
      v-if="inputDefinition.type === 'select'"
      :input-definition="inputDefinition"
      :model="String(model)"
      @on:change="emit('on:change', $event)"
    />
    <BaseFormInputTextarea
      v-else-if="inputDefinition.type === 'textarea'"
      :input-definition="inputDefinition"
      :model="String(model)"
      @on:change="emit('on:change', $event)"
    />
    <BaseFormInputTextField
      v-else
      :input-definition="inputDefinition"
      :model="String(model)"
      @on:change="emit('on:change', $event)"
    />
  </div>
</template>

<style scoped lang="scss"></style>
