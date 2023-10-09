<script setup lang="ts">
import { useEvent } from '~/stores/events.store';
import { storeToRefs } from 'pinia';
import BodyLayout from '~/layouts/body-layout.vue';

definePageMeta({
  middleware: ['signed'],
});

const $router = useRouter();
const $route = useRoute();
const $event = useEvent();
const { selectedEvent, loading } = storeToRefs($event);

const projectId = computed(() => String($route.params.projectId));
const eventId = computed(() => String($route.params.eventId));

const editRoute = computed(() => ({
  name: 'projects-projectId-events-eventId',
  params: { projectId: projectId.value, eventId: eventId.value },
}));

watch(
  eventId,
  (value) => {
    if (!value) return;
    $event.selectEvent(projectId.value, value);
  },
  {
    immediate: true,
  }
);

const remove = async () => {
  await $event.remove(projectId.value, eventId.value);
  $router.replace({
    name: 'projects-projectId',
    params: { projectId: projectId.value },
  });
};
</script>

<template>
  <BodyLayout title="Edit event" :go-back="editRoute">
    <template #actions>
      <BaseButton compact flat icon="delete" label="Delete" @click="remove" />
    </template>
    <BaseLoader v-if="loading" />
    <EventForm
      v-else-if="selectedEvent"
      :project-id="projectId"
      :model="selectedEvent"
    />
  </BodyLayout>
</template>

<style scoped lang="scss"></style>
