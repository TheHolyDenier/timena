<script setup lang="ts">
import BaseFormInput from '~/components/BaseFormInput.vue';
import { PropType } from '@vue/runtime-core';
import { InputDefinition } from '~/utils/interfaces/input-definition.interface';

defineProps({
  inputDefinitions: {
    type: Array as PropType<InputDefinition[]>,
    default: () => [],
  },
  compact: { type: Boolean },
});
</script>

<template>
  <form class="form" @submit.prevent>
    <template
      v-for="inputDefinition of inputDefinitions"
      :key="inputDefinition.name"
    >
      <BaseFormCheckbox
        class="form__child"
        v-if="inputDefinition.type === 'checkbox'"
        :label="inputDefinition.label"
        :name="inputDefinition.name"
      />

      <BaseFormInputPassword
        class="form__child"
        v-else-if="inputDefinition.type === 'password'"
        :label="inputDefinition.label"
        :name="inputDefinition.name"
      />

      <BaseFormInput
        class="form__child"
        v-else
        :label="inputDefinition.label"
        :name="inputDefinition.name"
        :type="inputDefinition.type"
      />
    </template>
    <div>
      <BaseButton :compact="compact">Enviar</BaseButton>
    </div>
  </form>
</template>

<style scoped lang="scss">
.form {
  display: flex;
  flex-direction: column;
  gap: 1em;

  &__child {
    flex: 1;
  }
}
</style>
