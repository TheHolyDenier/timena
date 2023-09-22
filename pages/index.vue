<script setup lang="ts">
import SignedLayout from '~/layouts/signed-layout.vue';
import { storeToRefs } from 'pinia';
import { useUser } from '~/stores/user.store';

const { me } = storeToRefs(useUser());
</script>

<template>
  <SignedLayout>
    Tata
    <template v-if="me" #right-aside>
      <TheProfile />
    </template>
  </SignedLayout>
</template>

<style scoped lang="scss"></style>
