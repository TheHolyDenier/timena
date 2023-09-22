<script setup lang="ts">
import { PropType } from 'vue';

defineProps({
  image: { type: String, default: null },
  title: { type: String, default: null },
  subtitle: { type: String, default: null },
  orientation: {
    type: String as PropType<
      'column' | 'row' | 'row-reverse' | 'column-reverse'
    >,
    default: 'column'
  },
  zoom: { type: Boolean },
  bordered: { type: Boolean },
  hasAction: { type: Boolean },
  hasImageSpace: { type: Boolean, default: true }
});
</script>

<template>
  <div
    class="card"
    :class="{ active: hasAction, bordered: bordered }"
    :style="{ flexDirection: orientation }"
  >
    <div
      v-if="hasImageSpace"
      class="card__image"
      :style="{ backgroundImage: `url(${image})` }"
    >
      <div class="card__image__actions">
        <slot name="actions"></slot>
      </div>
    </div>

    <div class="card__container">
      <template v-if="title || $slots.title">
        <slot name="title">
          <h2>{{ title }}</h2>
        </slot>
      </template>

      <template v-if="subtitle || $slots.subtitle">
        <slot name="subtitle">
          <p>{{ subtitle }}</p>
        </slot>
      </template>
      <template v-if="$slots.default">
        <slot></slot>
      </template>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '/styles/variables.scss';

.card {
  display: flex;
  flex-wrap: wrap;
  overflow: visible;

  &__image {
    flex: 1;
    background-repeat: no-repeat;
    background-size: cover;
    min-width: 150px;
    min-height: 150px;
    background-color: $blue;
    border-top-right-radius: 15px;
    border-top-left-radius: 15px;

    &__actions {
      display: flex;
      gap: 0.5em;
      position: absolute;
      top: 0;
      right: 0;
      padding: 0.4em;
    }
  }

  &__container {
    padding: 1em;
    flex: 4;

    > * {
      width: 100%;
      text-align: center;
    }

    h2 {
      display: flex;
      align-items: center;
    }
  }
}
</style>
