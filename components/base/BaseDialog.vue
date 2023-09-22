<script setup lang="ts">
defineEmits<{ (e: 'on:cancel'): void }>();
defineProps({ title: { type: String, required: true } });
</script>

<template>
  <div class="background" @click.self.prevent="$emit('on:cancel')">
    <div class="card bordered">
      <h2>{{ title }}</h2>
      <slot></slot>
      <div class="card__actions">
        <slot name="actions">
          <BaseButton
            label="Cancel"
            color="transparent"
            @click="$emit('on:cancel')"
          />
        </slot>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.background {
  justify-content: center;
  align-items: center;
}

.card {
  padding: 1em;
  h2 {
    margin: 0;
  }

  &__actions {
    display: flex;
    gap: 1em;
    justify-content: flex-end;
    margin-block-start: 0.5em;
  }
}
</style>
