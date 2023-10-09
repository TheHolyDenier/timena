<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { RouteLocationRaw } from 'vue-router';
import { useEvent } from '~/stores/event.store';
import BodyLayout from '~/layouts/body-layout.vue';

definePageMeta({
  middleware: ['signed'],
});

const $route = useRoute();
const $event = useEvent();

const { selectedEvent, loading } = storeToRefs($event);

const eventId = computed(() => String($route.params.eventId));
const projectId = computed(() => String($route.params.projectId));

const goBack: RouteLocationRaw = {
  name: 'projects-projectId',
  params: { projectId: projectId.value },
  query: { tabs: 'events' },
};

watch(
  eventId,
  (value) => {
    if (!value) return;
    $event.selectEvent(projectId.value!, value);
  },
  { immediate: true }
);
</script>

<template>
  <BodyLayout :go-back="goBack">
    <template #actions>
      <BaseButtonLink
        :to="{
          name: 'projects-projectId-events-eventId-edit',
          params: { projectId: projectId, eventId: eventId },
        }"
        compact
        outline
      >
        <BaseIcon icon="edit" /> Edit
      </BaseButtonLink>
    </template>

    <BaseLoader v-if="loading" />
    <BaseCard
      v-else-if="selectedEvent"
      :cover="selectedEvent.cover"
      :description="selectedEvent.description"
      :title="selectedEvent.title"
    >
      <template #tags>
        <div class="event__tags">
          <BaseTag
            v-if="selectedEvent.startDate"
            :label="`Starts: ${selectedEvent.startDate}`"
          />
          <BaseTag
            v-if="selectedEvent.endDate"
            :label="`Ends: ${selectedEvent.endDate}`"
          />
        </div>
      </template>
    </BaseCard>
  </BodyLayout>
</template>

<style scoped lang="scss"></style>
