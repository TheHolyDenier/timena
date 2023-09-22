<script setup lang="ts">
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useCampaign } from '~/stores/campaign.store';
import { useSidebar } from '~/composables/sidebar.composable';
import CampaignSidebar from '~/components/CampaignSidebar.vue';
import ElementCards from '~/components/ElementCards.vue';
import HeaderCard from '~/components/HeaderCard.vue';
import { useElement } from '~/stores/element.store';

definePageMeta({
  middleware: 'auth'
});

const $sidebar = useSidebar();
const $route = useRoute();
const $router = useRouter();
const $campaign = useCampaign();
const $element = useElement();

const { selectedCampaign, loading } = storeToRefs($campaign);

const selectedCampaignId = computed(() =>
  $route.params.campaignId ? String($route.params.campaignId) : undefined
);

const open = () => $sidebar.open();

const remove = async () => {
  await $campaign.remove(selectedCampaignId.value!);
  await $router.replace({ name: 'campaigns' });
};

watch(
  () => $campaign.needsRefresh,
  () => $campaign.getOne(selectedCampaignId.value!)
);

watch(
  () => selectedCampaignId.value,
  (campaignId) => {
    if (!campaignId) return;

    $campaign.getOne(campaignId);
    $element.get(campaignId);
  },
  { immediate: true }
);

watch(
  () => $element.needsRefresh,
  () => $element.get(selectedCampaignId.value!),
  { immediate: true }
);
</script>

<template>
  <HeaderCard
    :id="selectedCampaign?.id"
    :loading="!selectedCampaign || loading"
    :title="selectedCampaign?.title"
    :image="selectedCampaign?.cover"
    :markdown-text="selectedCampaign?.summary"
    @on:delete="remove"
    @on:update="open"
  >
    <ElementCards />

    <CampaignSidebar v-if="selectedCampaign" :campaign="selectedCampaign" />
  </HeaderCard>
</template>

<style scoped lang="scss"></style>
