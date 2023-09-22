<template>
  <div class="layout">
    <div class="layout__navigation">
      <TheBreadcrumb />
      <MiniProfile></MiniProfile>
    </div>
    <div class="layout__container">
      <slot> </slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import TheBreadcrumb from '~/components/unique/TheBreadcrumb.vue';

defineProps({
  title: { type: String, default: null }
});
</script>

<style lang="scss" scoped>
.layout {
  position: relative;
  padding: 1em;
  overflow: hidden;

  &__navigation {
    position: sticky;
    display: flex;
    justify-content: space-between;
    top: 0;
    width: calc(100vw - 2em);
    padding-block: 0.5em;
  }
}
</style>
