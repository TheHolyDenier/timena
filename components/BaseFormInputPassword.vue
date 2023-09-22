<script setup lang="ts">
import BaseFormInput from '~/components/BaseFormInput.vue';
import BaseButton from '~/components/BaseButton.vue';
import BaseIcon from '~/components/BaseIcon.vue';
import { ref } from '@vue/runtime-core';

defineEmits<{
  (e: 'on:update', value: string | number | undefined);
}>();

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
    @on:update="$emit('on:update', $event)"
  >
    <template #trailing-icon>
      <BaseButton compact @click="displayPassword = !displayPassword">
        <BaseIcon :icon="displayPassword ? 'visibility' : 'visibility_off'" />
      </BaseButton>
    </template>
  </BaseFormInput>
</template>

<style scoped lang="scss"></style>
