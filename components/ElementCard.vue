<script setup lang="ts">
import { PropType } from 'vue';
import { ElementDto } from '~/domain/elements/element.dto';

defineProps({
  element: { type: Object as PropType<ElementDto>, required: true }
});
</script>

<template>
  <BaseCard bordered has-action :image="element.cover">
    <template #actions>
      <BaseIcon v-if="!element.exists" icon="carrion" tooltip="Doesn't exist" />
      <BaseIcon v-if="element.isFavorite" icon="hearts" tooltip="Is favorite" />
    </template>
    <h2>
      <BaseIcon v-if="element.type" :icon="element.type" />{{ element.name }}
    </h2>
    <BaseMarkdownViewer
      :name="element.id"
      :value="element.description"
      :max-length="75"
    />
  </BaseCard>
</template>

<style scoped lang="scss">
.element__icons {
}
</style>
