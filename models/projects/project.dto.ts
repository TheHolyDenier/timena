import { Expose } from 'class-transformer';
import { BaseDto } from '~/models/base.dto';

export class ProjectDto extends BaseDto {
  @Expose()
  title: string;

  @Expose()
  summary?: string;

  @Expose()
  cover?: string;

  @Expose()
  isFavorite?: boolean;
}
