<script setup lang="ts">
import { useElement } from '~/stores/elements.store';
import { PropType } from '@vue/runtime-core';
import { ElementDto } from '~/utils/models/element/element.dto';
import { InputDefinition } from '~/utils/interfaces/input-definition.interface';
import { CreateElementDto } from '~/utils/models/element/create-element.dto';
import { UpdateElementDto } from '~/utils/models/element/update-element.dto';

const $element = useElement();
const $router = useRouter();

const props = defineProps({
  model: { type: Object as PropType<ElementDto> },
  projectId: { type: String, required: true },
});

const inputDefinitions: InputDefinition[] = [
  { name: 'name', label: 'Name' },
  { name: 'description', label: 'Description', type: 'markdown' },
  { name: 'cover', label: 'Cover' },
  { name: 'isFavorite', label: 'Is favorite?', type: 'checkbox' },
  { name: 'exists', label: 'Exists?', type: 'checkbox' },
  { name: 'type', label: 'Type', type: 'select' },
];

const createElement = async (createElement: CreateElementDto) => {
  const result = await $element.create(props.projectId, createElement);
  $router.push({
    name: 'projects-projectId-elements-elementId',
    params: { projectId: props.projectId, elementId: result.id },
  });
};

const updateElement = async (createElement: UpdateElementDto) => {
  const result = await $element.update(
    props.projectId,
    props.model!.id,
    createElement
  );
  $router.push({
    name: 'projects-projectId-elements-elementId',
    params: { projectId: props.projectId, elementId: result.id },
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
