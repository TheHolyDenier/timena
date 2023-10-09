<script setup lang="ts">
import { PropType } from '@vue/runtime-core';
import { ElementDto } from '~/utils/models/element/element.dto';
import { InputDefinition } from '~/utils/interfaces/input-definition.interface';
import { CreateEventDto } from '~/utils/models/event/create-event.dto';
import { UpdateEventDto } from '~/utils/models/event/update-event.dto';
import { useEvent } from '~/stores/event.store';

const $event = useEvent();
const $router = useRouter();

const props = defineProps({
  model: { type: Object as PropType<ElementDto> },
  projectId: { type: String, required: true },
});

const timePattern = '[0-9]{4}-[0-9]{2}-[0-9]{2}-[0-9]{2}';

const inputDefinitions: InputDefinition[] = [
  { name: 'title', label: 'Title' },
  { name: 'description', label: 'Description', type: 'markdown' },
  { name: 'cover', label: 'Cover' },
  { name: 'startDate', label: 'Start date', pattern: timePattern },
  { name: 'endDate', label: 'End date', pattern: timePattern },
];

const createEvent = async (createEvent: CreateEventDto) => {
  const result = await $event.create(props.projectId, createEvent);
  $router.push({
    name: 'projects-projectId-events-eventId',
    params: { projectId: props.projectId, eventId: result.id },
  });
};

const updateEvent = async (createEvent: UpdateEventDto) => {
  const result = await $event.update(
    props.projectId,
    props.model!.id,
    createEvent
  );
  $router.push({
    name: 'projects-projectId-events-eventId',
    params: { projectId: props.projectId, eventId: result.id },
  });
};
</script>

<template>
  <BaseForm
    :input-definitions="inputDefinitions"
    :model="model"
    @on:send="model ? updateEvent($event) : createEvent($event)"
  />
</template>

<style scoped lang="scss"></style>
