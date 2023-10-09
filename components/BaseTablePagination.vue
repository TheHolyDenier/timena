<script setup lang="ts">
const $route = useRoute();
const $router = useRouter();

const props = defineProps({
  activePage: { type: Number },
  elementsPerPage: { type: Number },
  totalResponse: { type: Number },
});

const totalPages = computed(() => {
  if (!props.elementsPerPage || !props.totalResponse) return 0;
  const addAnotherPage =
    props.totalResponse % props.elementsPerPage !== 0 ? 1 : 0;
  return (
    Math.floor(props.totalResponse / props.elementsPerPage) + addAnotherPage
  );
});

const updatePage = (toPage: number) => {
  $router.push({
    name: $route.name!,
    params: Object.assign({}, $route.params),
    query: Object.assign({}, $route.query, { page: toPage }),
  });
};
</script>

<template>
  <div v-if="totalPages" class="pagination">
    <BaseButton
      :disabled="activePage === 1"
      icon="arrow_left"
      @click="updatePage(activePage - 1)"
    />
    <BaseButton
      v-for="index in totalPages"
      :key="index"
      :label="String(index)"
      @click="updatePage(index)"
    />
    <BaseButton
      :disabled="totalPages < activePage + 1"
      icon="arrow_right"
      @click="updatePage(activePage + 1)"
    />
  </div>
</template>

<style scoped lang="scss">
.pagination {
  display: flex;
  align-items: center;
}
</style>
