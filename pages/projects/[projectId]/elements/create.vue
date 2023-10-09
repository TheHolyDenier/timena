<script setup lang="ts">
import ElementForm from '~/components/ElementForm.vue';
import BodyLayout from '~/layouts/body-layout.vue';

definePageMeta({
  middleware: ['signed'],
});

const $route = useRoute();

const projectId = computed(() =>
  $route.params.projectId ? String($route.params.projectId) : null
);
</script>

<template>
  <BodyLayout title="Add element" :go-back="{ name: 'projects-projectId' }">
    <ElementForm :project-id="projectId" />
  </BodyLayout>
</template>

<style scoped lang="scss"></style>
