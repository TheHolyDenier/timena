<script setup lang="ts">
import { PropType, ref } from '@vue/runtime-core';
import { InputDefinition } from '~/utils/interfaces/input-definition.interface';
import BaseFormCheckbox from '~/components/BaseFormCheckbox.vue';
import BaseFormInputPassword from '~/components/BaseFormInputPassword.vue';
import BaseFormInput from '~/components/BaseFormInput.vue';
import BaseButton from '~/components/BaseButton.vue';
import { FormData } from '~/utils/interfaces/form.data';

defineEmits<{ (e: 'on:send', value: FormData): void }>();

const props = defineProps({
  inputDefinitions: {
    type: Array as PropType<InputDefinition[]>,
    default: () => [],
  },
  compact: { type: Boolean },
  model: { type: Object as PropType<FormData> },
  loading: { type: Boolean },
});

const formData = ref<FormData>(props.model ? { ...props.model } : {});
</script>

<template>
  <form class="form" @submit.prevent>
    <template
      v-for="inputDefinition of inputDefinitions"
      :key="inputDefinition.name"
    >
      <BaseFormCheckbox
        v-if="inputDefinition.type === 'checkbox'"
        :label="inputDefinition.label"
        :name="inputDefinition.name"
        :value="formData[inputDefinition.name]"
        class="form__child"
        @on:update="formData[inputDefinition.name] = $event"
      />

      <BaseFormInputPassword
        v-else-if="inputDefinition.type === 'password'"
        :label="inputDefinition.label"
        :name="inputDefinition.name"
        :value="formData[inputDefinition.name]"
        class="form__child"
        @on:update="formData[inputDefinition.name] = $event"
      />

      <BaseFormInput
        v-else
        :label="inputDefinition.label"
        :name="inputDefinition.name"
        :type="inputDefinition.type"
        :value="formData[inputDefinition.name]"
        class="form__child"
        @on:update="formData[inputDefinition.name] = $event"
      />
    </template>

    <div>
      <BaseButton
        :loading="loading"
        :compact="compact"
        @click="$emit('on:send', formData)"
      >
        Enviar
      </BaseButton>
    </div>
  </form>
</template>

<style scoped lang="scss">
.form {
  display: flex;
  flex-direction: column;
  gap: 0.5em;

  &__child {
    flex: 1;
  }
}
</style>
