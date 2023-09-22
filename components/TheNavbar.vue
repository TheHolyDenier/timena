<script setup lang="ts">
import { useUser } from '~/stores/user.store';
import { storeToRefs } from 'pinia';

const $user = useUser();
const { me } = storeToRefs($user);

$user.recoverUser();
</script>

<template>
  <div class="navbar">
    <div class="navbar__navigation">
      <RouterLink to="/" class="navbar__navigation-item">
        <BaseIcon icon="home" />
        Inicio
      </RouterLink>
    </div>

    <div class="navbar__navigation">
      <RouterLink v-if="!!me" to="#" class="navbar__navigation-item">
        <BaseIcon class="navbar__login" icon="person" />
        {{ me?.username }}
      </RouterLink>
      <RouterLink v-else to="sign" class="navbar__navigation-item">
        <BaseIcon class="navbar__login" icon="person" />
        Login
      </RouterLink>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/scss/global';

.navbar {
  width: 100%;
  background: $primary-500;
  padding: 0.5em;

  display: flex;
  justify-content: space-between;
  align-items: center;

  &__navigation-item {
    display: flex;
    align-items: center;
    gap: 0.3em;
    color: white;
    text-decoration: none;

    &:hover {
      color: $secondary-500;

      .navbar__login {
        background: $secondary-500;
      }
    }
  }

  &__login {
    background: white;
    color: $primary-500;
    border-radius: 50%;
  }
}
</style>
