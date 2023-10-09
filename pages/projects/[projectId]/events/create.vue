<script setup lang="ts">
import BodyLayout from '~/layouts/body-layout.vue';
import EventForm from '~/components/EventForm.vue';

definePageMeta({
  middleware: ['signed'],
});

const $route = useRoute();

const projectId = computed(() =>
  $route.params.projectId ? String($route.params.projectId) : null
);
</script>

<template>
  <BodyLayout title="Add event" :go-back="{ name: 'projects-projectId' }">
    <EventForm :project-id="projectId" />
  </BodyLayout>
</template>

<style scoped lang="scss"></style>
