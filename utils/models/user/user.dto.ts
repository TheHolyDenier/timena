import { BaseDto } from '~/utils/models/base.dto';
import { Expose } from 'class-transformer';

export class UserDto extends BaseDto {
  @Expose()
  username: string;

  @Expose()
  email: string;

  @Expose()
  avatar?: string;

  @Expose()
  accessToken: string;
}
