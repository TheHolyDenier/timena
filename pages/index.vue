<script setup lang="ts">
import BodyLayout from '~/layouts/body-layout.vue';
import { storeToRefs } from 'pinia';
import { useUser } from '~/stores/user.store';

definePageMeta({
  middleware: ['signed'],
});

const { me } = storeToRefs(useUser());
</script>

<template>
  <BodyLayout class="index">
    <div v-if="me">
      <div class="index__header">
        <h1>Your projects</h1>
        <BaseButtonLink :to="{ name: 'create-project' }" compact outline>
          <BaseIcon icon="add" /> Project
        </BaseButtonLink>
      </div>
      <ProjectTable />
    </div>
  </BodyLayout>
</template>

<style scoped lang="scss">
.index {
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
