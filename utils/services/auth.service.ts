import { User } from '@prisma/client';
import { plainToInstance } from 'class-transformer';
import { SignInDto } from '~/utils/models/auth/sign-in.dto';
import { ApiResponse } from '~/utils/interfaces/api-response';
import { UserDto } from '~/utils/models/user/user.dto';
import { SignUpDto } from '~/utils/models/auth/sign-up.dto';

export class AuthService {
  async signIn(body: SignInDto): Promise<UserDto> {
    const result: ApiResponse<User> = await $fetch(
      `/api/auth?${getQueryParams(body)}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        } as HeadersInit,
      }
    );

    return plainToInstance(UserDto, result.data, {
      excludeExtraneousValues: true,
    });
  }

  async signUp(body: FormData): Promise<UserDto> {
    const result = await $fetch('/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(SignUpDto.create(body)),
    });

    return plainToInstance(UserDto, result.data, {
      excludeExtraneousValues: true,
    });
  }
}
