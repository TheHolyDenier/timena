<script setup lang="ts">
import { PropType } from '@vue/runtime-core';
import { CellDefinition } from '~/utils/interfaces/cell-definition.interface';
import BaseTableCell from '~/components/BaseTableCell.vue';
import { BaseDto } from '~/utils/models/base.dto';
import { ApiResponse } from '~/utils/interfaces/api-response';
import { PrismaRequest } from '~/utils/interfaces/prisma-request';

const $route = useRoute();
const $router = useRouter();

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

const totalPages = computed(() => {
  if (!request.value.elementsPerPage || !response.value.total) return 0;
  const addAnotherPage =
    response.value.total % request.value.elementsPerPage !== 0 ? 1 : 0;
  return (
    Math.floor(response.value.total / request.value.elementsPerPage) +
    addAnotherPage
  );
});

const activePage = computed(() =>
  $route.query.page ? Number($route.query.page) : 1
);

const request = computed<PrismaRequest>(() => ({
  page: activePage.value,
  elementsPerPage: 10,
}));

const updatePage = (toPage: number) => {
  $router.push({
    name: $route.name!,
    params: Object.assign({}, $route.params),
    query: Object.assign({}, $route.query, { page: toPage }),
  });
};

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
  <div v-if="totalPages" class="table__pagination">
    <BaseButton
      :disabled="activePage === 1"
      icon="arrow_left"
      @click="updatePage(activePage - 1)"
    />
    <BaseButton
      v-for="index in totalPages"
      :key="index"
      :label="String(index)"
      @click="updatePage(index)"
    />
    <BaseButton
      :disabled="totalPages < activePage + 1"
      icon="arrow_right"
      @click="updatePage(activePage + 1)"
    />
  </div>
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

  &__pagination {
    display: flex;
    align-items: center;
  }
}
</style>
