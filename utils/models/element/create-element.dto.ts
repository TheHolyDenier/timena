import { Expose } from 'class-transformer';

export class CreateElementDto {
  @Expose()
  name?: string;

  @Expose()
  summary?: string;

  @Expose()
  description?: string;

  @Expose()
  cover?: string;

  @Expose()
  isFavorite?: boolean;

  @Expose()
  exists?: boolean;

  @Expose()
  type?: string;
}
