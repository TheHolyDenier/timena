<script setup lang="ts">
import { PropType } from 'vue';
import { ListItemInterface } from '~/interfaces/list-item.interface';
import BaseListItem from '~/components/base/list/BaseListItem.vue';

defineProps({
  list: { type: Array as PropType<ListItemInterface[]>, default: () => [] }
});

defineEmits<{ (e: 'on:click', value: string): void }>();
</script>

<template>
  <div v-if="list?.length" class="list">
    <BaseListItem
      v-for="item of list"
      :key="item.name"
      :item="item"
      @on:click="$emit('on:click', $event)"
    />
  </div>
</template>

<style scoped lang="scss">
.list {
  display: flex;
  gap: 1em;
  flex-direction: column;
}
</style>
