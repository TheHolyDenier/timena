import { Expose } from 'class-transformer';
import { BaseDto } from '~/domain/base.dto';

export class CampaignDto extends BaseDto {
  @Expose()
  title: string;

  @Expose()
  summary?: string;

  @Expose()
  cover?: string;

  @Expose()
  isFavorite?: boolean;
}
