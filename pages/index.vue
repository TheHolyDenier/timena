<script setup lang="ts">
import BodyLayout from '~/layouts/body-layout.vue';
import { storeToRefs } from 'pinia';
import { useUser } from '~/stores/user.store';

const { me } = storeToRefs(useUser());
</script>

<template>
  <BodyLayout class="index">
    <div v-if="me">
      <div class="index__header">
        <h1>Your projects</h1>
        <BaseButton to="create-project" compact outline>
          <BaseIcon icon="add" /> Project
        </BaseButton>
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
