<script setup lang="ts">
import { PropType } from '@vue/runtime-core';

const props = defineProps({
  size: { type: String as PropType<'large' | 'medium' | 'small'> },
});

const sizeToPx = computed(() => {
  if (props.size === 'large') return '48px';
  return props.size === 'medium' ? '32px' : '15px';
});
</script>

<template>
  <span class="loader" :style="{ width: sizeToPx, height: sizeToPx }"></span>
</template>

<style scoped lang="scss">
@import 'assets/scss/global';

.loader {
  border: 3px solid #ccc;
  border-radius: 50%;
  display: inline-block;
  position: relative;
  box-sizing: border-box;
  animation: rotation 2s linear infinite;

  &::after {
    content: '';
    box-sizing: border-box;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 3px solid;
    border-color: $primary-500 transparent;
  }

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
</style>
