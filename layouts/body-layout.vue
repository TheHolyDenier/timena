<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useUser } from '~/stores/user.store';

const { me } = storeToRefs(useUser());
</script>

<template>
  <div class="signed">
    <div class="signed__body">
      <slot />
    </div>
    <div>
      <div v-if="me" class="signed__aside">
        <TheProfile class="signed__aside-content" />
      </div>
      <template v-if="Object.keys($slots).includes('right-aside')">
        <div
          v-for="key in Object.keys($slots).filter((keyValue) =>
            keyValue.includes('right-aside')
          )"
          :key="key"
          class="signed__aside"
        >
          <div class="signed__aside-content">
            <slot :name="key" />
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped lang="scss">
.signed {
  width: 100%;
  display: flex;
  gap: 1em;
  height: 100%;

  &__aside {
    background-color: #eee;
    padding-block-end: 0.5em;
    padding-inline-start: 0.5em;
  }

  &__aside-content {
    border-style: dashed;
    border-color: #ccc;
    border-bottom-width: 1px;
    border-left-width: 1px;
    border-right-width: 0;
    border-top-width: 0;
    padding: 1em;
  }

  &__body {
    flex: 2;
    padding: 1em;
    overflow-y: auto;
    height: 100%;
  }
}
</style>
