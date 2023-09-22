import { Expose, plainToInstance, Transform } from 'class-transformer';
import { BaseDto } from '~/domain/base.dto';
import { IconType } from '~/types/icon.type';
import { CampaignDto } from '~/domain/campaigns/campaign.dto';

export class ElementDto extends BaseDto {
  @Expose() name?: string;
  @Expose() description?: string;
  @Expose() cover?: string;
  @Expose() isFavorite?: boolean;
  @Expose() exists?: boolean;
  @Expose() type: IconType;

  @Transform(({ value }) => plainToInstance(CampaignDto, value))
  campaign?: CampaignDto;

  campaignId: string;
}
