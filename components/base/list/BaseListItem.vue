<script setup lang="ts">
import { PropType } from 'vue';
import { ListItemInterface } from '~/interfaces/list-item.interface';
import BaseListItemValue from '~/components/base/list/BaseListItemValue.vue';

defineProps({
  item: { type: Object as PropType<ListItemInterface>, required: true },
});

defineEmits<{ (e: 'on:click', value: string): void }>();
</script>

<template>
  <div
    class="card"
    :class="{
      active: item.to,
      ...(item.nameClass ? { [item.nameClass]: true } : {}),
    }"
    @click="$emit('on:click', item.name)"
  >
    <RouterLink v-if="item.to" :to="item.to">
      <BaseListItemValue :item="item" />
    </RouterLink>
    <BaseListItemValue v-else :item="item" />
  </div>
</template>

<style scoped lang="scss">
@import '/styles/variables';

:deep(.m-card) {
  width: 100%;
  padding: 1em;
  color: $blue;
  position: relative;
  background-color: $green-light;
}
</style>
