<script setup lang="ts">
import { PropType, ref } from '@vue/runtime-core';
import { InputDefinition } from '~/utils/interfaces/input-definition.interface';
import BaseFormCheckbox from '~/components/BaseFormCheckbox.vue';
import BaseFormInputPassword from '~/components/BaseFormInputPassword.vue';
import BaseFormInput from '~/components/BaseFormInput.vue';
import BaseButton from '~/components/BaseButton.vue';
import { FormData } from '~/utils/interfaces/form.data';
import { BaseDto } from '~/utils/models/base.dto';
import BaseFormMarkdown from '~/components/BaseFormMarkdown.vue';

defineEmits<{ (e: 'on:send', value: FormData): void }>();

const props = defineProps({
  inputDefinitions: {
    type: Array as PropType<InputDefinition[]>,
    default: () => [],
  },
  compact: { type: Boolean },
  model: { type: Object as PropType<BaseDto> },
  loading: { type: Boolean },
});

const formData = ref<FormData>(
  props.model ? ({ ...props.model } as FormData) : {}
);
</script>

<template>
  <form class="form" @submit.prevent>
    <fieldset
      class="form__fieldset"
      v-for="inputDefinition of inputDefinitions"
      :key="inputDefinition.name"
    >
      <label
        v-if="inputDefinition.label && inputDefinition.type !== 'checkbox'"
        :for="inputDefinition.name"
      >
        {{ inputDefinition.label }}
      </label>

      <BaseFormCheckbox
        v-if="inputDefinition.type === 'checkbox'"
        :label="inputDefinition.label"
        :name="inputDefinition.name"
        :value="formData[inputDefinition.name]"
        class="form__child"
        @on:update="formData[inputDefinition.name] = $event"
      />

      <BaseFormSelect
        :is="inputDefinition.isMultiple"
        v-else-if="inputDefinition.type === 'select'"
        :name="inputDefinition.name"
        :option-loader="inputDefinition.optionLoader"
        :value="formData[inputDefinition.name]"
        class="form__child"
        @on:update="formData[inputDefinition.name] = $event"
      />

      <BaseFormInputPassword
        v-else-if="inputDefinition.type === 'password'"
        :name="inputDefinition.name"
        :value="formData[inputDefinition.name]"
        class="form__child"
        @on:update="formData[inputDefinition.name] = $event"
      />

      <BaseFormMarkdown
        v-else-if="inputDefinition.type === 'markdown'"
        :name="inputDefinition.name"
        :value="formData[inputDefinition.name]"
        class="form__child"
        @on:update="formData[inputDefinition.name] = $event"
      />

      <BaseFormInput
        v-else
        :name="inputDefinition.name"
        :type="inputDefinition.type"
        :value="formData[inputDefinition.name]"
        class="form__child"
        @on:update="formData[inputDefinition.name] = $event"
      />
    </fieldset>

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

  &__fieldset {
    flex: 1;
    border: 0;
  }
}
</style>
