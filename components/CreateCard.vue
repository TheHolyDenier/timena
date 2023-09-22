<script setup lang="ts"></script>

<template>
  <BaseCard bordered has-action :has-image-space="false">
    <div class="create">
      <div class="create__container">
        <BaseIcon icon="dagger-rose" size="150px" color="black" />
        <h3>New</h3>
      </div>
    </div>
  </BaseCard>
</template>

<style scoped lang="scss">
.create {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  &__container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
}
</style>
