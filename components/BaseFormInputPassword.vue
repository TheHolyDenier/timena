<script setup lang="ts">
defineProps({
  name: { type: String, required: true },
  label: { type: String },
});

const displayPassword = ref(false);
</script>

<template>
  <BaseFormInput
    :label="label"
    :name="name"
    :type="displayPassword ? 'password' : 'text'"
  >
    <template #trailing-icon>
      <BaseButton compact @click="displayPassword = !displayPassword">
        <BaseIcon :icon="displayPassword ? 'visibility' : 'visibility_off'" />
      </BaseButton>
    </template>
  </BaseFormInput>
</template>

<style scoped lang="scss"></style>
