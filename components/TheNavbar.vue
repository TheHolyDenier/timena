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
      <RouterLink
        to="/"
        class="navbar__navigation-item navbar__navigation-item--link"
      >
        <BaseIcon icon="home" />
        Inicio
      </RouterLink>
    </div>

    <div class="navbar__navigation">
      <RouterLink
        v-if="!me"
        to="sign"
        class="navbar__navigation-item navbar__navigation-item--link"
      >
        <BaseIcon class="navbar__login" icon="account_circle" />
        Login
      </RouterLink>
    </div>
    <div v-if="me" class="navbar__navigation">
      <RouterLink
        class="navbar__navigation-item navbar__navigation-item--link"
        :to="{ name: 'sign' }"
        @click="$user.logout()"
      >
        <BaseIcon icon="logout" /> Logout
      </RouterLink>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/scss/global';

.navbar {
  width: calc(100vw - 2em);
  background: $primary-500;
  padding: 0.5em;
  border-radius: 15px 15px 0 0;

  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1em;

  &__navigation {
    &:first-child {
      flex: 2;
    }
  }

  &__navigation-item {
    display: flex;
    align-items: center;
    gap: 0.3em;
    color: white;
    text-decoration: none;

    &--link {
      &:hover {
        color: $secondary-500;
      }
    }
  }
}
</style>
