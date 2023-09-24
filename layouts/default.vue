<script setup lang="ts"></script>

<template>
  <div class="layout">
    <div class="layout__body">
      <TheNavbar />
      <div class="layout__body-slot">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.layout {
  max-width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #fafafa;
  padding: 0.5em;

  &__body {
    width: calc(100vw - 1em);
    min-height: calc(100vh - 1em);
    background: white;
    border-radius: 15px;
    box-shadow: rgba(0, 0, 0, 0.04) 0 3px 5px;
  }

  &__body-slot {
    height: 100%;
  }
}
</style>
