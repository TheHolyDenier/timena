import { BaseDto } from '~/utils/models/base.dto';
import { ProjectDto } from '~/utils/models/project/project.dto';
import { Type } from 'class-transformer';

export class ElementDto extends BaseDto {
  name?: string;

  description?: string;

  cover?: string;

  isFavorite?: boolean;

  exists?: boolean;

  type?: string;

  @Type(() => ProjectDto)
  project?: ProjectDto;
  projectId: string;
}
