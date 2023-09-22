import { Expose } from 'class-transformer';

export class CreateCampaignDto {
  @Expose()
  title: string;

  @Expose()
  summary?: string;

  @Expose()
  cover?: string;

  @Expose()
  isFavorite?: boolean;
}
