import { Expose, plainToInstance } from 'class-transformer';

export class SignInDto {
  @Expose()
  email: string;

  @Expose()
  password: string;

  static create(data: any): SignInDto {
    return plainToInstance(SignInDto, data, { excludeExtraneousValues: true });
  }
}
