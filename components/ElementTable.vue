<script setup lang="ts">
import { useElement } from '~/stores/elements.store';
import { ElementDto } from '~/utils/models/element/element.dto';
import BaseTable from '~/components/BaseTable.vue';
import { CellDefinition } from '~/utils/interfaces/cell-definition.interface';

const $element = useElement();
const $route = useRoute();

const projectId = computed(() => String($route.params.projectId));
const elements = ref<ElementDto[]>([]);

onMounted(
  async () =>
    (elements.value = await $element.get(projectId.value, {
      orderBy: [
        { field: 'isFavorite', order: 'asc' },
        { field: 'name', order: 'asc' },
      ],
    }))
);

const cellDefinitions: CellDefinition<ElementDto>[] = [
  { name: 'cover', title: 'Cover', type: 'image', field: 'cover' },
  { name: 'name', title: 'Name', field: 'name' },
  {
    name: 'isFavorite',
    title: 'Favorite?',
    field: 'isFavorite',
    type: 'boolean',
  },
  {
    name: 'exists',
    title: 'Exists?',
    field: 'exists',
    type: 'boolean',
  },
  {
    name: 'summary',
    title: 'Summary',
    field: 'summary',
  },
  {
    name: 'id',
    field: 'id',
    to: (element) => ({
      name: 'projects-projectId-elements-elementId',
      params: { projectId: projectId.value, elementId: element.id },
    }),
    type: 'link',
  },
];
</script>

<template>
  <BaseTable :cell-definitions="cellDefinitions" :data="elements" />
</template>

<style scoped lang="scss"></style>
