<script setup lang="ts">
defineProps({
  tooltip: { type: String, default: null },
  bordered: { type: Boolean, default: true }
});
</script>

<template>
  <div v-if="tooltip" class="tooltip">
    <slot></slot>
    <div class="tooltip__text">
      {{ tooltip }}
    </div>
  </div>
  <div v-else>
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
@import 'styles/variables.scss';

.tooltip {
  position: relative;
  display: inline-block;

  &.bordered {
    border-bottom: 1px dotted $blue; /* If you want dots under the hoverable text */
  }

  /* Tooltip text */
  &__text {
    visibility: hidden;
    width: 120px;
    background-color: $secondary;
    color: $blue;
    text-align: center;
    padding: 5px 0;
    border-radius: 6px;

    /* Position the tooltip text */
    position: absolute;
    z-index: 5;
    bottom: 125%;
    left: 50%;
    margin-left: -60px;

    /* Fade in tooltip */
    opacity: 0;
    transition: opacity 0.3s;

    /* Tooltip arrow */
    &:after {
      content: '';
      position: absolute;
      top: 100%;
      left: 50%;
      margin-left: -5px;
      border-width: 5px;
      border-style: solid;
      border-color: $secondary transparent transparent transparent;
    }
  }

  /* Show the tooltip text when you mouse over the tooltip container */
  &:hover .tooltip__text {
    visibility: visible;
    opacity: 1;
  }
}
</style>
