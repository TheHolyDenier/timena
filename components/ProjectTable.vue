<script setup lang="ts">
import { ProjectDto } from '~/utils/models/project/project.dto';
import { useProject } from '~/stores/project.store';
import { CellDefinition } from '~/utils/interfaces/cell-definition.interface';
import BaseTable from '~/components/BaseTable.vue';
import { PrismaRequest } from '~/utils/interfaces/prisma-request';
import { cloneDeep } from 'lodash';

const $project = useProject();

const getProjects = async (request: PrismaRequest) => {
  const req = cloneDeep(request);
  req.orderBy = [{ isFavorite: 'asc' }, { title: 'asc' }];
  return $project.get(req);
};

const cellDefinitions: CellDefinition<ProjectDto>[] = [
  { name: 'cover', title: 'Cover', type: 'image', field: 'cover' },
  { name: 'title', title: 'Title', field: 'title' },
  {
    name: 'isFavorite',
    title: 'Favorite?',
    field: 'isFavorite',
    type: 'boolean',
  },
  { name: 'summary', title: 'Summary', field: 'summary' },
  {
    name: 'id',
    field: 'id',
    to: (project) => ({
      name: 'projects-projectId',
      params: { projectId: project.id },
    }),
    type: 'link',
  },
];
</script>

<template>
  <BaseTable :cell-definitions="cellDefinitions" :get-data="getProjects" />
</template>

<style scoped lang="scss"></style>
