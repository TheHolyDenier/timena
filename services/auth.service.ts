import { User } from '@prisma/client';
import { SignInDto } from '~/models/auth/sign-in.dto';
import { SignUpDto } from '~/models/auth/sign-up.dto';
import { ApiResponse } from '~/interfaces/api-response';
import { getQueryParams } from '~/utils/query-params';
import { FormDataInterface } from '~/interfaces/form-data.interface';

export class AuthService {
  async signIn(body: SignInDto): Promise<User> {
    const result: ApiResponse<User> = await $fetch<ApiResponse<User>>(
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

  async signUp(body: FormDataInterface): Promise<User> {
    const result: ApiResponse<User> = await $fetch<ApiResponse<User>>(
      '/api/auth',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(SignUpDto.create(body)),
      }
    );

    return result.data as User;
  }
}
