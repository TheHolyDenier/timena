<script setup lang="ts">
import { CellDefinition } from '~/utils/interfaces/cell-definition.interface';
import { BaseDto } from '~/utils/models/base.dto';
import { RouteLocationRaw } from 'vue-router';
import { PropType } from '@vue/runtime-core';

const props = defineProps({
  cellDefinition: {
    type: Object as PropType<CellDefinition<BaseDto>>,
    required: true,
  },
  data: { type: Object, required: true },
});

const value = computed(() => {
  return typeof props.cellDefinition.field === 'function'
    ? props.cellDefinition.field(props.data as BaseDto)
    : props.data[props.cellDefinition.field];
});

const to = computed<undefined | string | RouteLocationRaw>(() => {
  return typeof props.cellDefinition.to === 'function'
    ? props.cellDefinition.to(props.data as BaseDto)
    : props.cellDefinition.to;
});
</script>

<template>
  <span v-if="value === null">-</span>
  <BaseImage
    v-else-if="cellDefinition.type === 'image'"
    :src="value"
    :alt="cellDefinition.title"
    aspect-ratio="2 / 3 "
    size="100px"
  />
  <span v-else-if="cellDefinition.type === 'boolean'">
    {{ value ? 'YES' : 'NO' }}
  </span>
  <RouterLink v-else-if="cellDefinition.type === 'link' && to" :to="to">
    <BaseIcon icon="link" />
  </RouterLink>
  <span v-else> {{ value }} </span>
</template>

<style scoped lang="scss"></style>
