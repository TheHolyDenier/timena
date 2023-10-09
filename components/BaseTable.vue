<script setup lang="ts">
import { PropType } from '@vue/runtime-core';
import { CellDefinition } from '~/utils/interfaces/cell-definition.interface';
import BaseTableCell from '~/components/BaseTableCell.vue';
import { BaseDto } from '~/utils/models/base.dto';
import { ApiResponse } from '~/utils/interfaces/api-response';
import { PrismaRequest } from '~/utils/interfaces/prisma-request';
import BaseTablePagination from '~/components/BaseTablePagination.vue';

const $route = useRoute();

const props = defineProps({
  cellDefinitions: {
    type: Array as PropType<CellDefinition<Partial<BaseDto>>[]>,
    default: () => [],
  },
  getData: {
    type: Function as PropType<
      (request: PrismaRequest) => Promise<ApiResponse<Partial<BaseDto>>>
    >,
    required: true,
  },
});

const response = ref<ApiResponse<Partial<BaseDto>>>({ data: [] });

const activePage = computed(() =>
  $route.query.page ? Number($route.query.page) : 1
);

const request = computed<PrismaRequest>(() => ({
  page: activePage.value,
  elementsPerPage: 10,
}));

watch(
  request,
  async () => {
    response.value = await props.getData(request.value);
  },
  { deep: true, immediate: true }
);
</script>

<template>
  <table class="table">
    <tr class="table__row table__row--header">
      <th
        class="table__title"
        v-for="cellDefinition of cellDefinitions"
        :key="cellDefinition.name"
      >
        {{ cellDefinition.title }}
      </th>
    </tr>
    <tr v-for="element of response.data" :key="element.id" class="table__row">
      <td v-for="cellDefinition of cellDefinitions" :key="cellDefinitions">
        <BaseTableCell :cell-definition="cellDefinition" :data="element" />
      </td>
    </tr>
  </table>
  <BaseTablePagination
    :active-page="activePage"
    :elements-per-page="request.elementsPerPage"
    :total-response="response.total"
  />
</template>

<style scoped lang="scss">
.table {
  border-collapse: separate;
  border-spacing: 1em;
  margin: 25px 0;
  width: 100%;

  &__title {
    text-transform: uppercase;
    font-size: 0.8rem;
    text-align: left;
    padding-block: 0.3em;
  }
}
</style>
