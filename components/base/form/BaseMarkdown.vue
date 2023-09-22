<script setup lang="ts">
import debounce from 'lodash/debounce';

const $emit = defineEmits<{
  (e: 'on:change', value: string): void;
}>();

const props = defineProps({
  name: { type: String, required: true },
  inputValue: { type: String, default: '' },
});

const id = `${props.name}-markdown`;
//
// const onChange = () => $emit('on:change', editor!.getMarkdown());
//
// onMounted(() => {
//   const { $markdown } = useNuxtApp();
// });
</script>

<template>
  <div :id="id"></div>
</template>

<style scoped lang="scss">
.markdown {
  min-width: 575px;
}
</style>
