import { api } from '~/plugins/di';
import { FormDataInterface } from '~/interfaces/form-data.interface';
import { CampaignDto } from '~/domain/campaigns/campaign.dto';

export const useCampaign = defineStore('campaign', () => {
  const needsRefresh = ref<number>(Date.now());
  const loading = ref(false);
  const campaigns = ref<CampaignDto[]>([]);

  const selectedCampaign = ref<CampaignDto | null>(null);

  const refresh = () => (needsRefresh.value = Date.now());
  const create = async (body: FormDataInterface) => {
    loading.value = true;
    const campaign = await api.campaign.create(body);
    loading.value = false;

    refresh();
    return campaign;
  };

  const get = async () => {
    loading.value = true;
    campaigns.value = await api.campaign.get();
    loading.value = false;
  };

  const getOne = async (id: string) => {
    clearSelected();
    loading.value = true;
    selectedCampaign.value = await api.campaign.getOne(id);
    loading.value = false;
  };

  const remove = async (id: string) => {
    loading.value = true;
    await api.campaign.remove(id);
    loading.value = false;
  };

  const update = async (body: FormDataInterface, id: string) => {
    loading.value = true;
    const campaign = await api.campaign.update(id, body);
    loading.value = false;
    refresh();
    return campaign;
  };

  const clearSelected = () => {
    selectedCampaign.value = null;
  };

  return {
    loading,
    campaigns,
    selectedCampaign,
    create,
    update,
    get,
    getOne,
    remove,
    refresh,
    clearSelected,
    needsRefresh
  };
});
