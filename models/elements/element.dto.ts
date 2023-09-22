import { Expose, plainToInstance, Transform } from 'class-transformer';
import { BaseDto } from '~/models/base.dto';
import { IconType } from '~/types/icon.type';
import { ProjectDto } from '~/models/projects/project.dto';

export class ElementDto extends BaseDto {
  @Expose() name?: string;
  @Expose() description?: string;
  @Expose() cover?: string;
  @Expose() isFavorite?: boolean;
  @Expose() exists?: boolean;
  @Expose() type: IconType;

  @Transform(({ value }) => plainToInstance(ProjectDto, value))
  project?: ProjectDto;

  projectId: string;
}
