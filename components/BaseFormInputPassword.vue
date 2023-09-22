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
  value: { type: String },
});

const hidePassword = ref(true);
</script>

<template>
  <BaseFormInput
    :label="label"
    :name="name"
    :type="hidePassword ? 'password' : 'text'"
    :value="value"
    @on:update="$emit('on:update', $event)"
  >
    <template #trailing-icon>
      <BaseButton compact @click="hidePassword = !hidePassword">
        <BaseIcon :icon="hidePassword ? 'visibility' : 'visibility_off'" />
      </BaseButton>
    </template>
  </BaseFormInput>
</template>

<style scoped lang="scss"></style>
