<script setup lang="ts">
defineProps({
  name: { type: String, required: true },
  label: { type: String },
});
</script>

<template>
  <fieldset class="checkbox">
    <input type="checkbox" :id="name" :name="name" />
    <label v-if="label" :for="name">
      {{ label }}
    </label>
  </fieldset>
</template>

<style scoped lang="scss">
.checkbox {
  display: flex;
  align-items: center;
  gap: 0.5em;
}
</style>
