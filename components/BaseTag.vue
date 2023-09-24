<script setup lang="ts">
defineProps({ label: { type: String }, removable: { type: Boolean } });
</script>

<template>
  <span class="label" :class="{ 'label--action': removable }">
    {{ label }}
    <BaseIcon v-if="removable" icon="close" size="15px" />
  </span>
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
  display: flex;
  align-items: center;
  gap: 0.2em;

  &--action {
    cursor: pointer;
  }

  &--positive {
    background-color: $secondary-500;
  }

  &--negative {
    background-color: $secondary-neutral;
  }
}
</style>
