<script setup lang="ts">
defineEmits<{
  (e: 'on:delete'): void;
  (e: 'on:update'): void;
}>();

defineProps({
  loading: { type: Boolean },
  image: { type: String, default: null },
  title: { type: String, default: null },
  id: { type: String, default: null },
  markdownText: { type: String, default: null },
  maxLength: { type: Number, default: 150 }
});
</script>

<template>
  <BaseLoading v-if="loading" />
  <div v-else class="header-card">
    <BaseCard
      :image="image"
      orientation="row"
      :style="{ width: '100%', padding: '0' }"
    >
      <template #title>
        <div
          class="header-card__title"
          :style="{ width: '100%', padding: '0' }"
        >
          <h1>
            {{ title }}
          </h1>
          <DeleteButton @on:delete="$emit('on:delete')" />
          <EditButton @click="$emit('on:update')" />
        </div>
      </template>
      <template v-if="markdownText && id" #subtitle>
        <BaseMarkdownViewer
          :name="id!"
          :value="markdownText"
          :max-length="maxLength"
        />
      </template>
    </BaseCard>

    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
.header-card {
  &__title {
    display: flex;
    gap: 1em;
    align-items: center;
    flex-wrap: wrap;
    justify-content: center;

    h1 {
      flex: 1;
      margin: 0;
    }
  }
}
</style>
