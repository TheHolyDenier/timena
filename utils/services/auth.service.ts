import { User } from '@prisma/client';
import { SignInDto } from '~/utils/models/auth/sign-in.dto';
import { SignUpDto } from '~/utils/models/auth/sign-up.dto';
import { ApiResponse } from '~/utils/interfaces/api-response';
import { getQueryParams } from '~/utils/query-params';
import { FormData } from '~/utils/interfaces/form.data';

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

    return result.data as User;
  }

  async signUp(body: FormData): Promise<User> {
    const result: ApiResponse<User> = await $fetch('/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(SignUpDto.create(body)),
    });

    return result.data as User;
  }
}
