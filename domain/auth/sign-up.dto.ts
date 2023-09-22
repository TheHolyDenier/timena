import { Expose, plainToInstance } from 'class-transformer';

export class SignUpDto {
  @Expose()
  username: string;

  @Expose()
  email: string;

  @Expose()
  password: string;

  static create(data: any): SignUpDto {
    return plainToInstance(SignUpDto, data, { excludeExtraneousValues: true });
  }
}
