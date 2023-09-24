<script setup lang="ts">
defineProps({ label: { type: String } });
</script>

<template>
  <span class="label">{{ label }}</span>
</template>

<style scoped lang="scss">
@import 'assets/scss/global';
.label {
  font-size: 0.7em;
  border-radius: 7px;
  padding: 0.4em;
  font-weight: bold;
  background-color: $primary-neutral;
  text-transform: uppercase;

  &--positive {
    background-color: $secondary-500;
  }

  &--negative {
    background-color: $secondary-neutral;
  }
}
</style>
