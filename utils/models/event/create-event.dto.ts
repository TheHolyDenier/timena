import { Expose } from 'class-transformer';

export class CreateEventDto {
  @Expose()
  title?: string;

  @Expose()
  description?: string;

  @Expose()
  cover?: string;

  @Expose()
  startDate?: string;

  @Expose()
  endDate?: string;
}
