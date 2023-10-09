<script setup lang="ts">
import { PropType, ref, watch } from '@vue/runtime-core';
import { InputType } from '~/utils/types/input.type';
import { OptionDefinition } from '~/utils/interfaces/option-definition.interface';
import BaseFormSelectTags from '~/components/BaseFormSelectTags.vue';
import BaseFormSelectOptions from '~/components/BaseFormSelectOptions.vue';

const emit = defineEmits<{
  (e: 'on:update', value: string[]): void;
}>();

const props = defineProps({
  name: { type: String, required: true },
  label: { type: String },
  type: { type: String as PropType<InputType>, default: 'text' },
  value: { type: [String, Number], default: '' },
  isMultiple: { type: Boolean },
  optionLoader: {
    type: Function as PropType<
      (inputValue?: string) => Promise<OptionDefinition[]>
    >,
  },
});

const modelValue = ref(props.value ? [props.value] : []);
const search = ref(props.value && !props.isMultiple ? props.value : '');

const optionsValues = ref<OptionDefinition[]>([]);

const options = computed<OptionDefinition[]>(() =>
  search.value === ''
    ? optionsValues.value
    : optionsValues.value.filter(
        (option) =>
          option.value === search.value ||
          option.label
            .toLowerCase()
            .includes(String(search.value).toLowerCase())
      )
);
const displayOptions = ref(false);

const optionsRef = ref<HTMLElement>();

const optionAction = (optionValue: string) => {
  if (!props.isMultiple && modelValue.value.length) modelValue.value.length = 0;

  const index = modelValue.value.findIndex((option) => option === optionValue);

  if (index === -1) modelValue.value.push(optionValue);
  else modelValue.value.splice(index, 1);

  if (!props.isMultiple) search.value = modelValue.value[0] || '';
};

const className = computed(() => `select--${props.name}`);

watch(
  modelValue,
  (value) => {
    emit('on:update', props.isMultiple ? value : value[0]);
  },
  { deep: true }
);

const closeSelectListener = (event: Event) => {
  const target = event.target as HTMLElement;
  if (!target.getAttribute('class')?.includes(className.value)) {
    displayOptions.value = false;
  }
};

onMounted(async () => {
  document.addEventListener('click', closeSelectListener, false);
  optionsValues.value = await props.optionLoader();
});
onBeforeUnmount(() => {
  document.removeEventListener('click', closeSelectListener, false);
});
</script>

<template>
  <div v-if="optionsValues" class="select">
    <BaseFormSelectTags
      v-if="isMultiple"
      :tags="modelValue"
      @on:remove="optionAction"
    />
    <div class="select__container">
      <BaseFormInput
        :value="search"
        :name="`select-${name}`"
        @on:update="search = String($event)"
        @click.stop="displayOptions = !displayOptions"
      />
      <div
        class="select__trailing-icon"
        @click.stop="displayOptions = !displayOptions"
      >
        <BaseIcon icon="arrow_drop_down" />
      </div>
      <BaseFormSelectOptions
        v-if="displayOptions"
        ref="optionsRef"
        :options="options"
        :selected-options="modelValue"
        @on:click="optionAction"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.select {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-block: 0.5em 1em;

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
