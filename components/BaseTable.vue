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
  data: { type: Array, default: () => [] },
});
</script>

<template>
  <table>
    <tr>
      <th
        class="table__title"
        v-for="cellDefinition of cellDefinitions"
        :key="cellDefinitions"
      >
        {{ cellDefinition.title }}
      </th>
    </tr>
    <tr v-for="element of data" :key="element.id">
      <td v-for="cellDefinition of cellDefinitions" :key="cellDefinitions">
        <BaseTableCell :cell-definition="cellDefinition" :data="element" />
      </td>
    </tr>
  </table>
</template>

<style scoped lang="scss">
.table {
  &__title {
    text-transform: uppercase;
    font-size: 0.8rem;
  }
}
</style>
