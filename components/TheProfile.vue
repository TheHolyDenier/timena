<script setup lang="ts">
import { useUser } from '~/stores/user.store';

const { me, loading } = useUser();
</script>

<template>
  <div :aria-busy="loading" v-if="me" class="profile">
    <p v-if="!loading" class="profile__title">
      Hi,
      <span class="profile__title--name">
        <BaseImage :alt="me.username" :src="me.avatar" size="25px" round />
        {{ me.username }}!
      </span>
      <BaseButton to="/profile" compact flat>
        <BaseIcon icon="edit" /> Edit profile
      </BaseButton>
    </p>
  </div>
</template>

<style lang="scss" scoped>
.profile__title {
  display: inline-flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;

  &--name {
    display: inline-flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.1em;
  }
}
</style>
