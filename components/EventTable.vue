<script setup lang="ts">
import BaseTable from '~/components/BaseTable.vue';
import { CellDefinition } from '~/utils/interfaces/cell-definition.interface';
import { useEvent } from '~/stores/event.store';
import { EventDto } from '~/utils/models/event/event.dto';

const $event = useEvent();
const $route = useRoute();

const projectId = computed(() => $route.params.projectId);
const events = ref<EventDto[]>([]);

onMounted(async () => (events.value = await $event.get(projectId.value)));

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
  <BaseTable :cell-definitions="cellDefinitions" :data="events" />
</template>

<style scoped lang="scss"></style>
