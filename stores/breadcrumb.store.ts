import { RouteLocationRaw } from 'vue-router';
import { storeToRefs } from 'pinia';
import { NavigationInterface } from '~/interfaces/navigation.interface';
import { useCampaign } from '~/stores/campaign.store';
import { useElement } from '~/stores/element.store';

export const useBreadcrumb = defineStore('breadcrumb', () => {
  const { selectedCampaign } = storeToRefs(useCampaign());
  const { selectedElement } = storeToRefs(useElement());

  const navigation = computed<NavigationInterface[]>(() => [
    {
      name: 'index',
      icon: 'wood-cabin',
      getTo: () => ({ name: 'index' })
    },
    {
      name: 'campaigns-campaignId',
      label:
        selectedCampaign.value?.title || selectedElement.value?.campaign?.title,
      getTo:
        selectedCampaign.value || selectedElement.value
          ? (): RouteLocationRaw => ({
              name: 'campaigns-campaignId',
              params: {
                campaignId:
                  selectedCampaign.value?.id ||
                  selectedElement.value?.campaignId
              }
            })
          : undefined
    },
    {
      name: 'campaigns-campaignId-elements-elementId',
      label: selectedElement.value?.name,
      getTo: selectedElement.value
        ? (): RouteLocationRaw => ({
            name: 'campaigns-campaignId-elements-elementId',
            params: {
              campaignId: selectedElement.value!.campaignId,
              elementId: selectedElement.value!.name
            }
          })
        : undefined
    }
  ]);

  return { navigation };
});
