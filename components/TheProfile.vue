<script setup lang="ts">
import { useUser } from '~/stores/user.store';

const { me } = useUser();
</script>

<template>
  <div class="profile">
    <img
      v-if="me.avatar"
      class="profile__avatar"
      :src="me.avatar"
      :alt="me.username"
    />
    <BaseIcon v-else class="profile__avatar" icon="person" />
    <h2>Hi, {{ me.username }}!</h2>
    <BaseButton to="profile" outline>Edit profile</BaseButton>
  </div>
</template>

<style scoped lang="scss">
.profile {
  display: flex;
  flex-direction: column;
  gap: 1em;
  align-items: center;

  &__avatar {
    font-size: 150px;
    background: white;
    border-radius: 50%;
    width: 150px;
  }
}
</style>
