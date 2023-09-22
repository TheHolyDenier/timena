<script setup lang="ts">
import { useCampaign } from '~/stores/campaign.store';
import CampaignForm from '~/components/CampaignForm.vue';
import { ListItemInterface } from '~/interfaces/list-item.interface';

definePageMeta({
  middleware: 'auth'
});

const $campaign = useCampaign();
const campaigns = computed(() =>
  $campaign.campaigns.map<ListItemInterface>((campaign) => ({
    name: campaign.id,
    title: campaign.title,
    subtitle: campaign.summary || undefined,
    to: { name: 'campaigns-campaignId', params: { campaignId: campaign.id } },
    leadingIcon: 'scroll-quill'
  }))
);

onMounted(() => {
  $campaign.get();
});

watch(
  () => $campaign.needsRefresh,
  () => $campaign.get()
);
</script>

<template>
  <div class="campaigns">
    <h1 class="campaigns__title">Campaigns</h1>
    <div class="campaigns__container">
      <div class="campaigns__container__list">
        <BaseList :list="campaigns" />
      </div>
      <div>
        <BaseCard title="Create campaign" :has-image-space="false" bordered>
          <CampaignForm />
        </BaseCard>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.campaigns {
  display: flex;
  min-width: 500px;
  flex-wrap: wrap;
  gap: 1em;
  justify-content: center;

  &__title {
    width: 100%;
  }

  &__container {
    display: flex;
    flex-wrap: wrap;
    gap: 1em;
    justify-content: center;

    &__list {
      flex: 1;
      min-width: 40vw;
    }
  }
}
</style>
