import { User } from '@prisma/client';
import { useUser } from '~/stores/user.store';
import { UpdateUserDto } from '~/domain/users/update-user.dto';
import { ApiResponse } from '~/interfaces/api-response';

export class UserService {
  async getMe(): Promise<User> {
    const user = useUser();

    const result: ApiResponse<User> = await $fetch('/api/secure/users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: user.token(),
      },
    });

    return result.data as User;
  }

  async update(body: UpdateUserDto): Promise<User> {
    const user = useUser();

    const result: ApiResponse<User> = await $fetch('/api/secure/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: user.token(),
      },
      body: JSON.stringify(UpdateUserDto.create(body)),
    });

    return result.data as User;
  }
}
