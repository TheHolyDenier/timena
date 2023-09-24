<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useUser } from '~/stores/user.store';
import TheProfileSidebar from '~/components/TheProfileSidebar.vue';

defineProps({ title: { type: String }, goBack: { type: Object } });

const { me } = storeToRefs(useUser());
const slots = useSlots();

const rightAsideSlots = computed(() => {
  return Object.keys(slots).filter((key) => key.includes('right-aside'));
});
</script>

<template>
  <div class="signed">
    <div class="signed__body">
      <div v-if="title || $slots.actions" class="signed__title">
        <div class="signed__navigation">
          <div>
            <BaseButton v-if="goBack" :to="goBack" flat compact>
              <BaseIcon icon="arrow_back" />Go back
            </BaseButton>
          </div>
          <div class="signed__title-actions">
            <slot name="actions" />
          </div>
        </div>
        <h1>{{ title }}</h1>
      </div>
      <slot />
    </div>
    <div class="signed__right-aside">
      <div v-if="me" class="signed__aside">
        <TheProfileSidebar
          class="signed__aside-content signed__aside-content--first-one"
        />
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
@import 'assets/scss/global';

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
    border-top-width: 1px;
    padding: 1em;
    display: flex;
    flex-direction: column;
    gap: 1em;
    align-items: center;

    &--first-one {
      border-top-width: 0;
    }
  }

  &__body {
    flex: 2;
    padding: 1em;
    overflow-y: auto;
    height: 100%;
  }

  &__title {
    border-bottom: 1px solid $primary-500;
    margin-block-end: 1em;
  }

  &__navigation {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__title-header {
    display: flex;
    gap: 0.5em;
    align-items: center;
  }

  &__title-actions {
    display: flex;
    gap: 0.5em;
  }

  &__right-aside {
    display: flex;
    flex-direction: column;
    gap: 1em;
  }
}
</style>
