<script setup lang="ts">
import { useElement } from '~/stores/elements.store';
import { PropType } from '@vue/runtime-core';
import { ElementDto } from '~/utils/models/element/element.dto';
import { InputDefinition } from '~/utils/interfaces/input-definition.interface';
import { CreateElementDto } from '~/utils/models/element/create-element.dto';
import { UpdateElementDto } from '~/utils/models/element/update-element.dto';

const $project = useElement();
const $router = useRouter();

const props = defineProps({
  model: { type: Object as PropType<ElementDto> },
  projectId: { type: String, required: true },
});

const inputDefinitions: InputDefinition[] = [
  { name: 'name', label: 'Name' },
  { name: 'description', label: 'Description' },
  { name: 'cover', label: 'Cover' },
  { name: 'isFavorite', label: 'Is favorite?', type: 'checkbox' },
  { name: 'exists', label: 'Exists?', type: 'checkbox' },
  { name: 'type', label: 'Type' },
];

const createElement = async (createElement: CreateElementDto) => {
  const result = await $project.create(props.projectId, createElement);
  $router.push({
    name: 'projects-projectId',
    params: { projectId: props.projectId },
  });
};

const updateElement = async (createElement: UpdateElementDto) => {
  const result = await $project.update(props.model.id, createElement);
  $router.push({
    name: 'projects-projectId',
    params: { projectId: props.projectId },
  });
};
</script>

<template>
  <BaseForm
    :input-definitions="inputDefinitions"
    :model="model"
    @on:send="model ? updateElement($event) : createElement($event)"
  />
</template>

<style scoped lang="scss"></style>
