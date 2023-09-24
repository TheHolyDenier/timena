<script setup lang="ts">
import { useUser } from '~/stores/user.store';

const { me, loading } = useUser();
</script>

<template>
  <BaseLoader v-if="loading" />
  <div v-else-if="me" class="profile">
    <p class="profile__title">
      Hi,
      <RouterLink :to="{ name: 'profile' }" class="profile__title--name">
        <BaseImage :alt="me.username" :src="me.avatar" size="25px" round />
        {{ me.username }}!
      </RouterLink>
    </p>
  </div>
</template>

<style lang="scss" scoped>
.profile__title {
  display: inline-flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5em;

  &--name {
    display: inline-flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.1em;
    font-weight: bold;
  }
}
</style>
