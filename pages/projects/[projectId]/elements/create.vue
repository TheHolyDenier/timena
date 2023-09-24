<script setup lang="ts">
import ElementForm from '~/components/ElementForm.vue';
import BodyLayout from '~/layouts/body-layout.vue';

const $route = useRoute();

const projectId = computed(() => String($route.params.projectId));
</script>

<template>
  <BodyLayout title="Add element" :go-back="{ name: 'projects-projectId' }">
    <ElementForm :project-id="projectId" />
  </BodyLayout>
</template>

<style scoped lang="scss"></style>
