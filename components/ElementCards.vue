<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useSidebar } from '~/composables/sidebar.composable';
import { useElement } from '~/stores/element.store';

const $sidebar = useSidebar();
const $router = useRouter();
const $route = useRoute();
const $element = useElement();

const { elements } = storeToRefs($element);
const selectedCampaignId = computed(() => String($route.params.campaignId));

const open = async () => {
  await $router.replace({ query: { element: 'true' } });
  return $sidebar.open();
};

const openElement = (elementId: string) => {
  $router.push({
    name: 'campaigns-campaignId-elements-elementId',
    params: { campaignId: selectedCampaignId.value, elementId }
  });
};
</script>

<template>
  <div class="elements">
    <h2>Elements</h2>
    <div class="elements__list">
      <CreateCard @click="open" />
      <ElementCard
        v-for="element of elements"
        :key="element.id"
        :element="element"
        @click="openElement(element.id)"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import 'styles/variables.scss';

.elements {
  h2 {
    margin-block: 1em 0;
    border-top: 1px dashed $blue;
  }

  &__list {
    margin-block: 1em;
    max-width: calc(100vw - 2em);
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 300px));
    grid-auto-rows: 1fr;
    grid-gap: 1em;

    @media only screen and (max-width: $phoneWidth) {
      justify-content: center;
    }
  }
}
</style>
