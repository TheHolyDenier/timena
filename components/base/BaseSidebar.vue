<script setup lang="ts">
import { useSidebar } from '~/composables/sidebar.composable';

defineProps({ title: { type: String, required: true } });

const sidebar = useSidebar();

const isSidebarOpen = computed<boolean>(() => sidebar.isOpen.value);
const close = () => sidebar.close();
</script>

<template>
  <Transition name="slide-fade">
    <div v-if="isSidebarOpen" class="background" @click.self.prevent="close">
      <div class="sidebar" @close="close">
        <div class="sidebar__title">
          <h2>
            {{ title }}
          </h2>
          <BaseButton
            leading-icon="cancel"
            round
            color="transparent"
            icon-size="25px"
            @click="close"
          />
        </div>
        <div class="sidebar__content">
          <slot></slot>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped lang="scss">
@import 'styles/variables.scss';

.background {
  justify-content: flex-end;

  @media only screen and (max-width: $phoneWidth) {
    justify-content: flex-start;
  }

  .sidebar {
    background-color: $green-light;
    min-width: 300px;
    max-width: 95vw;

    overflow-y: scroll;
    overflow-x: hidden;
    border-left: 2px solid $blue;

    &__title {
      background-color: $secondary;
      padding-inline: 1em;
      padding-block: 1.5em;
      display: flex;
      align-items: center;
      justify-content: space-between;
      h2 {
        margin: 0;
      }
    }
  }
}
</style>
