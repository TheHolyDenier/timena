<script setup lang="ts">
const props = defineProps({
  name: { type: String, required: true },
  value: { type: String, default: null },
  maxLength: { type: Number, default: 0 },
});
const id = `${props.name}-markdown`;

const description = computed(() => {
  const text = props.value || '';
  const textIsLonger = props.maxLength !== 0 && text.length > props.maxLength;
  return textIsLonger ? `${text.substring(0, props.maxLength)}...` : text;
});

onMounted(() => {
  // const { $viewer } = useNuxtApp();
  // eslint-disable-next-line no-new
  // new $viewer({
  //   el: document.querySelector(`#${id}`)!,
  //   initialValue: description.value
  // });
});
</script>

<template>
  <div :id="id"></div>
</template>

<style scoped lang="scss"></style>
