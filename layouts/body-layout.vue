<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useUser } from '~/stores/user.store';

const { me } = storeToRefs(useUser());
const slots = useSlots();

const rightAsideSlots = computed(() => {
  return Object.keys(slots).filter((key) => key.includes('right-aside'));
});
</script>

<template>
  <div class="signed">
    <div class="signed__body">
      <slot />
    </div>
    <div class="signed__right-aside">
      <div v-if="me" class="signed__aside">
        <TheProfile class="signed__aside-content" />
      </div>
      <template v-if="rightAsideSlots.length">
        <div v-for="key in rightAsideSlots" :key="key" class="signed__aside">
          <div>
            <template class="signed__aside-content">
              <slot :name="key" />
            </template>
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
    padding-block: 0.5em;
    padding-inline-start: 0.5em;
    max-width: 200px;

    &:first-child {
      padding-block-start: 0;
    }
  }

  &__aside-content {
    border-style: dashed;
    border-color: #ccc;
    border-bottom-width: 1px;
    border-left-width: 1px;
    border-right-width: 0;
    padding: 1em;
    display: flex;
    flex-direction: column;
    gap: 1em;
    align-items: center;

    &:first-child {
      border-top-width: 1px;
    }
  }

  &__body {
    flex: 2;
    padding: 1em;
    overflow-y: auto;
    height: 100%;
  }

  &__right-aside {
    display: flex;
    flex-direction: column;
    gap: 1em;
  }
}
</style>
