<script setup lang="ts">
defineEmits<{ (e: 'on:remove', value: string) }>();

defineProps({
  isMultiple: { type: Boolean },
  tags: { type: Array, required: true },
});
</script>

<template>
  <div class="select-tags">
    <BaseTag
      v-for="tag of tags"
      :key="tag"
      :label="tag"
      removable
      @click="$emit('on:remove', tag)"
    />
  </div>
</template>

<style scoped lang="scss">
.select-tags {
  display: flex;
  gap: 0.3em;
  padding-block: 0.3em;
}
</style>
