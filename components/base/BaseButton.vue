<script setup lang="ts">
import { PropType } from 'vue';
import { ColorType } from '~/types/color.type';
import { IconType } from '~/types/icon.type';

defineProps({
  to: { type: Object, default: null },
  label: { type: String, default: null },
  loading: { type: Boolean, default: false },
  color: {
    type: String as PropType<ColorType>,
    default: 'primary'
  },
  round: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  leadingIcon: { type: String as PropType<IconType>, default: null },
  trailingIcon: { type: String as PropType<IconType>, default: null },
  iconSize: { type: String, default: undefined }
});
</script>

<template>
  <div>
    <button class="button" :class="{ [color]: true, round: round }">
      <BaseIcon
        v-if="leadingIcon"
        :icon="leadingIcon"
        :color="color"
        contrast-color
        :size="iconSize"
      />

      <span>{{ label }}</span>

      <BaseIcon
        v-if="trailingIcon"
        :icon="trailingIcon"
        :color="color"
        contrast-color
        :size="iconSize"
      />
    </button>
  </div>
</template>

<style scoped lang="scss">
@import 'styles/variables.scss';

button {
  padding: 0.5em;
  border: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.2em;
  margin: 0;
  line-height: 0.8rem;

  span {
    font-family: $titleFont;
  }

  &.round {
    padding: 0.2em;
    border-radius: 100%;
    gap: 0;
  }

  &.primary {
    color: $green-light;
    background-color: $primary;

    &:hover {
      background-color: $primary-dark;
    }
  }

  &.secondary {
    color: $blue;
    background-color: $secondary;

    &:hover {
      background-color: $secondary-dark;
    }
  }

  &.black {
    color: $green-light;
    background-color: $blue;

    &:hover {
      background-color: $blue-dark;
    }
  }

  &.transparent {
    color: $blue;
    background-color: transparent;

    &:hover {
      background-color: rgba($blue, 0.1);
    }
  }

  &.white {
    background-color: $green-light;
    color: $blue;
    border: 1px solid $blue;
    border-right: 7px;

    &:hover {
      background-color: rgba($blue, 0.1);
    }
  }
}
</style>
