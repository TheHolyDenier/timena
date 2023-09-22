import { useBaseService } from '~/services/base.service';
import { CreateCampaignDto } from '~/domain/campaigns/create-campaign.dto';
import { UpdateCampaignDto } from '~/domain/campaigns/update-campaign.dto';
import { CampaignDto } from '~/domain/campaigns/campaign.dto';
import { FormDataInterface } from '~/interfaces/form-data.interface';

export const useCampaignService = () => {
  const $base = useBaseService<
    CampaignDto,
    CreateCampaignDto,
    UpdateCampaignDto
  >(CampaignDto, CreateCampaignDto, UpdateCampaignDto);
  const baseUrl = '/api/secure/campaigns';
  return {
    create: async (body: FormDataInterface) => $base.create!(baseUrl, body),
    update: async (id: string, body: FormDataInterface) =>
      $base.update!(`${baseUrl}/${id}`, body),
    get: async () => $base.get(baseUrl),
    getOne: async (id: string) => $base.getOne(`${baseUrl}/${id}`),
    remove: async (id: string) => $base.remove(`${baseUrl}/${id}`)
  };
};
