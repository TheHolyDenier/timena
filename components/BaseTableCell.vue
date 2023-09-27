<script setup lang="ts">
import { CellDefinition } from '~/utils/interfaces/cell-definition.interface';
import { BaseDto } from '~/utils/models/base.dto';
import { RouteLocationRaw } from 'vue-router';
import { PropType } from '@vue/runtime-core';
import BaseTag from '~/components/BaseTag.vue';

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
  <BaseTag
    v-if="cellDefinition.type === 'boolean'"
    :label="value ? 'YES' : 'NO'"
    :class="{ 'label--positive': value, 'label--negative': !value }"
  />
  <span v-else-if="value === null">-</span>
  <BaseImage
    v-else-if="cellDefinition.type === 'image'"
    :src="value"
    :alt="cellDefinition.title"
    aspect-ratio="2 / 3 "
    size="100px"
  />
  <RouterLink v-else-if="cellDefinition.type === 'link' && to" :to="to">
    <BaseIcon icon="link" />
  </RouterLink>
  <BaseTag v-else-if="cellDefinition.type === 'tag'" :label="value" />
  <span v-else-if="cellDefinition.type === 'html'" v-html="value"> </span>
  <span v-else> {{ value }} </span>
</template>

<style scoped lang="scss"></style>
