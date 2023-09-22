import { plainToInstance } from 'class-transformer';

export class SignInDto {
  email: string;

  password: string;

  static create(data: any): SignInDto {
    return plainToInstance(SignInDto, data, { excludeExtraneousValues: true });
  }
}
