import { User } from '@prisma/client';
import { SignInDto } from '~/utils/models/auth/sign-in.dto';
import { SignUpDto } from '~/utils/models/auth/sign-up.dto';
import { ApiResponse } from '~/utils/interfaces/api-response';
import { getQueryParams } from '~/utils/query-params';
import { FormData } from '~/utils/interfaces/form.data';
import { plainToInstance } from 'class-transformer';
import { UserDto } from '~/utils/models/user/user.dto';

export class AuthService {
  async signIn(body: SignInDto): Promise<User> {
    const result: ApiResponse<User> = await $fetch(
      `/api/auth?${getQueryParams(body)}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return plainToInstance(UserDto, result.data, {
      excludeExtraneousValues: true,
    });
  }

  async signUp(body: FormData): Promise<ApiResponse<User>> {
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
