<script setup lang="ts">
import { PropType, ref, watch } from '@vue/runtime-core';
import { InputType } from '~/utils/types/input.type';
import { ELEMENT_TYPES } from '~/utils/models/element/ELEMENT_TYPES';

const emit = defineEmits<{
  (e: 'on:update', value: string | number | undefined);
}>();

const props = defineProps({
  name: { type: String, required: true },
  label: { type: String },
  type: { type: String as PropType<InputType>, default: 'text' },
  value: { type: [String, Number], default: '' },
});

const modelValue = ref([]);
const search = ref('');

const options = computed(() =>
  search.value === ''
    ? ELEMENT_TYPES
    : ELEMENT_TYPES.filter(
        (option) =>
          option.value === search.value ||
          option.label.toLowerCase().includes(search.value.toLowerCase())
      )
);
const displayOptions = ref(false);

const optionsRef = ref<HTMLElement>(null);

const optionAction = (optionValue: string) => {
  const index = modelValue.value.findIndex((option) => option === optionValue);
  if (index === -1) modelValue.value.push(optionValue);
  else modelValue.value.splice(index, 1);
};

watch(modelValue, (value) => {
  emit('on:update', value);
});

// document.addEventListener() TODO on close
</script>

<template>
  <fieldset class="select">
    <label v-if="label" :for="name">
      {{ label }}
    </label>
    <div class="select__tags">
      <BaseTag
        v-for="value of modelValue"
        :key="value"
        :label="value"
        removable
        @click="optionAction(value)"
      />
    </div>
    <div class="select__container">
      <input
        v-model="search"
        ref="inputRef"
        :id="name"
        :type="type || 'text'"
        class="select__element"
        @click="displayOptions = !displayOptions"
      />
      <div
        @click="displayOptions = !displayOptions"
        class="select__trailing-icon"
      >
        <BaseIcon icon="arrow_drop_down" />
      </div>
      <div
        v-if="displayOptions"
        ref="optionsRef"
        class="select__options"
        tabindex="0"
        @focusout="displayOptions = false"
      >
        <div
          class="select__option select__option--empty"
          v-if="!options.length"
        >
          No options...
        </div>
        <div
          v-for="option in options"
          :key="option.value"
          class="select__option"
          :class="{
            'select__option--selected': modelValue.includes(option.value),
          }"
          @click.stop="optionAction(option.value)"
        >
          <BaseIcon v-if="option.icon" :icon="option.icon" />
          {{ option.label }}
        </div>
      </div>
    </div>
  </fieldset>
</template>

<style scoped lang="scss">
@import 'assets/scss/global';

.select {
  max-width: calc(100% - 26px);
  margin: 0;

  &__element {
    margin-block-end: 0 !important;
    height: 50px;
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

  &__tags {
    display: flex;
    gap: 0.3em;
    padding-block: 0.3em;
  }

  &__options {
    position: absolute;
    background: white;
    right: 0;
    left: 0;
    max-height: 300px;
    overflow-y: auto;
  }

  &__option {
    padding: 1em;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.3em;

    &:hover {
      background-color: $primary-neutral;
    }

    &--empty {
      cursor: auto;
      background-color: inherit;
    }

    &--selected {
      background-color: $secondary-neutral;

      &:hover {
        background-color: $secondary-neutral;
      }
    }
  }
}
</style>
