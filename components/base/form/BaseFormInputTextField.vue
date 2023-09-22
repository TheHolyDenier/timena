<script setup lang="ts">
import { PropType, ref } from 'vue';
import { InputDefinitionInterface } from '~/interfaces/input-definition.interface';
import { InputEventInterface } from '~/interfaces/input-event.interface';

const props = defineProps({
  inputDefinition: {
    type: Object as PropType<InputDefinitionInterface>,
    required: true,
  },
  model: { type: [String, Number], default: null },
});

const emit = defineEmits<{
  (e: 'on:change', inputEvent: InputEventInterface): void;
}>();

const inputValue = ref(props.model ? String(props.model) : '');

const error = ref(false);
const errorMessage = ref<string | undefined>(undefined);

watch(
  () => inputValue.value,
  () => {
    emit('on:change', {
      name: props.inputDefinition.name,
      value: inputValue.value,
    });
  }
);

const form = useForm();
const isValid = async () => {
  error.value = false;
  errorMessage.value = undefined;
  const result = await form.validate(inputValue.value, props.inputDefinition);

  if (result !== true) {
    error.value = true;
    errorMessage.value = result;
    return false;
  }

  return true;
};
</script>

<template>
  <BaseFormInputLayout
    :id="inputDefinition.name"
    :label="inputDefinition.label"
    :required="inputDefinition.required"
  >
    <input
      :id="inputDefinition.name"
      v-model="inputValue"
      :aria-invalid="error || undefined"
      :name="inputDefinition.name"
      :placeholder="errorMessage"
      :required="inputDefinition.required"
      :type="inputDefinition.type"
      @blur="isValid"
    />
  </BaseFormInputLayout>
</template>

<style scoped lang="scss"></style>
