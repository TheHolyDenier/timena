<script setup lang="ts">
import { PropType } from '@vue/runtime-core';
import { CellDefinition } from '~/utils/interfaces/cell-definition.interface';
import BaseTableCell from '~/components/BaseTableCell.vue';
import { BaseDto } from '~/utils/models/base.dto';

defineProps({
  cellDefinitions: {
    type: Array as PropType<CellDefinition<BaseDto>[]>,
    default: () => [],
  },
  data: { type: Array as PropType<BaseDto[]>, default: () => [] },
});
</script>

<template>
  <table class="table">
    <tr class="table__row table__row--first">
      <th
        class="table__title"
        v-for="cellDefinition of cellDefinitions"
        :key="cellDefinition.name"
      >
        {{ cellDefinition.title }}
      </th>
    </tr>
    <tr v-for="element of data" :key="element.id" class="table__row">
      <td v-for="cellDefinition of cellDefinitions" :key="cellDefinitions">
        <BaseTableCell :cell-definition="cellDefinition" :data="element" />
      </td>
    </tr>
  </table>
</template>

<style scoped lang="scss">
.table {
  border-collapse: separate;
  border-spacing: 1em;
  margin: 25px 0;
  width: 100%;

  &__row {
    &--first {
    }
  }

  &__title {
    text-transform: uppercase;
    font-size: 0.8rem;
    text-align: left;
    padding-block: 0.3em;
  }
}
</style>
