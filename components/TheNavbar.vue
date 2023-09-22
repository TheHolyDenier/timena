<script setup lang="ts">
import BaseIcon from '~/components/BaseIcon.vue';
</script>

<template>
  <div class="navbar">
    <div class="navbar__navigation">
      <div class="navbar__navigation-item">
        <BaseIcon icon="home" />
        Inicio
      </div>
    </div>

    <div class="navbar__navigation">
      <div class="navbar__navigation-item">
        <BaseIcon class="navbar__login" icon="person" />
        Login
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/scss/global';

.navbar {
  width: 100%;
  background: $primary;
  padding: 0.5em;

  color: white;

  display: flex;
  justify-content: space-between;
  align-items: center;

  &__navigation-item {
    display: flex;
    align-items: center;
    gap: 0.3em;
  }

  &__login {
    background: white;
    color: $primary;
    border-radius: 50%;
  }
}
</style>
