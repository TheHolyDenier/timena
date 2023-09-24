<script setup lang="ts">
defineProps({
  src: { type: String },
  size: { type: String, default: '150px' },
  alt: { type: String, default: 'Image' },
  round: { type: Boolean },
  roundedCorners: { type: Boolean },
  aspectRatio: { type: String, default: '1 / 1' },
});
</script>

<template>
  <div
    v-if="src"
    class="picture"
    :class="{
      'picture--round': round,
      'picture--rounded-borders': roundedCorners,
    }"
    :style="{ width: size, 'aspect-ratio': aspectRatio }"
  >
    <img class="picture__image" :alt="alt" :src="src" />
  </div>
  <BaseIcon v-else icon="image" :style="{ 'font-size': size }" />
</template>

<style scoped lang="scss">
.picture {
  overflow: hidden;

  &--round {
    border-radius: 50%;
  }

  &--rounded-borders {
    border-radius: 15px;
  }

  &__image {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
}
</style>
