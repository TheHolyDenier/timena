<script setup lang="ts">
import { PropType } from 'vue';
import BaseIcon from '~/components/base/BaseIcon.vue';
import { ListItemInterface } from '~/interfaces/list-item.interface';

defineProps({
  item: { type: Object as PropType<ListItemInterface>, required: true }
});
</script>

<template>
  <div class="item bordered">
    <h3>
      <BaseIcon v-if="item.leadingIcon" :icon="item.leadingIcon" />
      {{ item.title }}
    </h3>
    <div v-if="item.subtitle">
      <BaseMarkdownViewer
        :name="item.name"
        :value="item.subtitle"
        :max-length="100"
      />
    </div>
    <div v-if="$slots.default">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import 'styles/variables.scss';

.item {
  border-radius: 15px;
  padding: 1em;
  margin-inline: 1em;

  h3 {
    margin: 0;
  }
}
</style>
