<script setup lang="ts">
defineProps({
  compact: { type: Boolean },
  outline: { type: Boolean },
  to: { type: String },
  flat: { type: Boolean },
  loading: { type: Boolean },
});
</script>

<template>
  <RouterLink v-if="to" :to="to" class="button button--link">
    <button
      class="button"
      :class="{ 'button--compact': compact, outline, 'button--flat': flat }"
      :aria-busy="loading"
      :disabled="loading"
    >
      <slot></slot>
    </button>
  </RouterLink>
  <button
    v-else
    class="button"
    :class="{ 'button--compact': compact, outline, flat }"
    :aria-busy="loading"
    :disabled="loading"
  >
    <slot></slot>
  </button>
</template>

<style scoped lang="scss">
@import 'assets/scss/global';

.button {
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.3em;
  padding-block: 0;
  padding-inline: 0.3em;
  text-transform: uppercase;
  height: 40px;

  &--flat {
    background: transparent;
    border: 0;
    color: $primary-500;

    &:focus {
      color: $primary-700;
    }
  }

  &--compact {
    width: auto;
  }

  &--link {
    text-decoration: none;
    width: auto;
  }
}
</style>
