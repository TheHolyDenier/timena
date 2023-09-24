import { BaseDto } from '~/utils/models/base.dto';
import { Type } from 'class-transformer';
import { ProjectDto } from '~/utils/models/project/project.dto';

export class EventDto extends BaseDto {
  title?: string;

  description?: string;

  cover?: string;

  startDate?: string;

  endDate?: string;

  @Type(() => ProjectDto)
  project?: ProjectDto;
  projectId: string;
}
