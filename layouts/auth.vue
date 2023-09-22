<template>
  <div class="auth-container">
    <slot />
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.auth-container {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1em;
  height: 100vh;
  width: 100vw;
}
</style>
