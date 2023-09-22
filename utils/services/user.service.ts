import { User } from '@prisma/client';
import { useUser } from '~/stores/user.store';
import { UpdateUserDto } from '~/utils/models/user/update-user.dto';
import { ApiResponse } from '~/interfaces/api-response';
import { plainToInstance } from 'class-transformer';

export class UserService {
  async getMe() {
    const user = useUser();

    const result: ApiResponse<User> = await $fetch('/api/secure/users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: user.token(),
      },
    });

    return result.data;
  }

  async update(body: UpdateUserDto): Promise<User> {
    const user = useUser();

    const result: ApiResponse<User> = await $fetch('/api/secure/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: user.token(),
      },
      body: JSON.stringify(plainToInstance(UpdateUserDto, body)),
    });

    return result.data as User;
  }
}
