<script setup lang="ts">
import BaseTable from '~/components/BaseTable.vue';
import { CellDefinition } from '~/utils/interfaces/cell-definition.interface';
import { useEvent } from '~/stores/event.store';
import { EventDto } from '~/utils/models/event/event.dto';
import { PrismaRequest } from '~/utils/interfaces/prisma-request';
import { cloneDeep } from 'lodash';

const $event = useEvent();
const $route = useRoute();

const projectId = computed(() =>
  $route.params.projectId ? String($route.params.projectId) : null
);

const getData = async (request: PrismaRequest) => {
  const req = cloneDeep(request);
  req.orderBy = [{ startDate: 'asc' }, { title: 'asc' }];

  return $event.get(projectId.value!, req);
};

const cellDefinitions: CellDefinition<EventDto>[] = [
  { name: 'cover', title: 'Cover', type: 'image', field: 'cover' },
  { name: 'title', title: 'Title', field: 'title' },
  { name: 'startDate', title: 'Start Date', field: 'startDate' },
  { name: 'endDate', title: 'End Date', field: 'endDate' },
  {
    name: 'id',
    field: 'id',
    to: (event) => ({
      name: 'projects-projectId-events-eventId',
      params: { projectId: projectId.value, eventId: event.id },
    }),
    type: 'link',
  },
];
</script>

<template>
  <BaseTable :cell-definitions="cellDefinitions" :get-data="getData" />
</template>

<style scoped lang="scss"></style>
