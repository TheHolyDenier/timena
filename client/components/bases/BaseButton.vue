<script setup lang="ts">
import { PropType } from '@vue/runtime-core';

defineProps({
  text: { type: String },
  type: { type: String as PropType<'submit'> },
});
</script>

<template>
  <button :type="type">{{ text }}</button>
</template>

<style scoped></style>
