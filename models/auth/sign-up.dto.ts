import { plainToInstance } from 'class-transformer';

export class SignUpDto {
  username: string;

  email: string;

  password: string;

  static create(data: any): SignUpDto {
    return plainToInstance(SignUpDto, data, { excludeExtraneousValues: true });
  }
}
