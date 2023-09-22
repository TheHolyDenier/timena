import { Expose, plainToInstance } from 'class-transformer';

export class UpdateUserDto {
  @Expose()
  avatar?: string;

  static create(data: any): UpdateUserDto {
    return plainToInstance(UpdateUserDto, data, {
      excludeExtraneousValues: true
    });
  }
}
