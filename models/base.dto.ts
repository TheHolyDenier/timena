import { Expose } from 'class-transformer';

export class BaseDto {
  @Expose()
  id: string;

  @Expose()
  createdById: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
