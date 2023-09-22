<script setup lang="ts">
import { PropType } from '@vue/runtime-core';
import { IconType } from '~/utils/types/icon.type';

defineProps({ icon: { type: String as PropType<IconType>, required: true } });
</script>

<template>
  <span class="material-symbols-outlined">{{ icon }}</span>
</template>

<style scoped lang="scss"></style>
