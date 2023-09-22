import { Expose, Transform } from 'class-transformer';

export class CreateElementDto {
  @Expose()
  name: string;

  @Expose()
  campaignId: string;

  @Expose()
  type?: string;

  @Expose()
  description?: string;

  @Expose()
  cover?: string;

  @Expose()
  @Transform(({ value }) => !!value)
  isFavorite?: boolean;

  @Expose()
  @Transform(({ value }) => !!value)
  exists?: boolean;
}
