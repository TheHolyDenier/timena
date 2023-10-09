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

const projectId = computed(() =>
  $route.params.projectId ? String($route.params.projectId) : null
);
const eventId = computed(() =>
  $route.params.eventId ? String($route.params.eventId) : null
);

const editRoute = computed(() => ({
  name: 'projects-projectId-events-eventId',
  params: { projectId: projectId.value, eventId: eventId.value },
}));

onMounted(() => $event.selectEvent(projectId.value, eventId.value));

watch(eventId, (value) => $event.selectEvent(projectId.value, value));

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
      <BaseButton flat compact @click="remove">
        <BaseIcon icon="delete" />Delete
      </BaseButton>
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
