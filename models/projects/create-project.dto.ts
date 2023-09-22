import { Expose } from 'class-transformer';

export class CreateProjectDto {
  @Expose()
  title: string;

  @Expose()
  summary?: string;

  @Expose()
  cover?: string;

  @Expose()
  isFavorite?: boolean;
}
