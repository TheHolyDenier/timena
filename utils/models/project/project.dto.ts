import { BaseDto } from '~/utils/models/base.dto';

export class ProjectDto extends BaseDto {
  title: string;
  summary?: string;
  cover?: string;
  isFavorite?: string;
}
