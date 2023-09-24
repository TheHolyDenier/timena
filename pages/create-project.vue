<script setup lang="ts">
import BodyLayout from '~/layouts/body-layout.vue';
import ProjectForm from '~/components/ProjectForm.vue';

definePageMeta({
  middleware: ['signed'],
});
</script>

<template>
  <BodyLayout>
    <h1>Create project</h1>
    <ProjectForm />
  </BodyLayout>
</template>

<style scoped lang="scss"></style>
