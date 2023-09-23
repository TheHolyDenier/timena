<script setup lang="ts">
import { PropType } from '@vue/runtime-core';
import { CellDefinition } from '~/utils/interfaces/cell-definition.interface';

const props = defineProps({
  cellDefinition: {
    type: Object as PropType<CellDefinition<T>>,
    required: true,
  },
  data: { type: Object, required: true },
});

const value = computed(() => {
  return typeof props.cellDefinition.field === 'function'
    ? props.cellDefinition.field(props.data)
    : props.data[props.cellDefinition.field];
});

const to = computed(() => {
  return typeof props.cellDefinition.to === 'function'
    ? props.cellDefinition.to(props.data)
    : props.to;
});
</script>

<template>
  <span v-if="value === null">-</span>
  <img
    class="cell--image"
    v-else-if="cellDefinition.type === 'image'"
    :src="value"
    :alt="cellDefinition.title"
  />
  <span v-else-if="cellDefinition.type === 'boolean'">
    {{ value ? 'YES' : 'NO' }}
  </span>
  <RouterLink v-else-if="cellDefinition.type === 'link'" :to="to">
    <BaseIcon icon="link" />
  </RouterLink>
  <span v-else> {{ value }} </span>
</template>

<style scoped lang="scss">
.cell--image {
  max-width: 100px;
}
</style>
