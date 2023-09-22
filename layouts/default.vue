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
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #fafafa;

  &__body {
    max-width: 100vw;
    width: 60vw;
    height: 100%;
    background: white;
    border-radius: 15px;
    margin-block: 0.5em;
    overflow: hidden;

    box-shadow: rgba(0, 0, 0, 0.04) 0 3px 5px;
  }

  &__body-slot {
    padding: 1em;
    overflow-y: auto;
  }
}
</style>
