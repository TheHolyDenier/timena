<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { RouteLocationRaw } from 'vue-router';
import { useEvent } from '~/stores/event.store';

definePageMeta({
  middleware: ['signed'],
});

const $route = useRoute();
const $event = useEvent();

const { selectedEvent, loading } = storeToRefs($event);

const eventId = computed(() => $route.params.eventId);
const projectId = computed(() => $route.params.projectId);

const goBack: RouteLocationRaw = {
  name: 'projects-projectId',
  params: { projectId: projectId.value },
};

watch(eventId, (value) => {
  $event.selectElement(projectId.value, value);
});

onMounted(() => $event.selectEvent(projectId.value, eventId.value));
</script>

<template>{{ selectedEvent }}</template>

<style scoped lang="scss"></style>
