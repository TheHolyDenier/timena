<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useUser } from '~/stores/user.store';

const user = useUser();
user.getMe();
const { me } = storeToRefs(user);
</script>

<template>
  <div class="ribbon">
    <h2>{{ me?.username }}</h2>
  </div>
</template>

<style scoped lang="scss">
@import 'styles/variables.scss';
</style>
