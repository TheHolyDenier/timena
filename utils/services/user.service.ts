import { User } from '@prisma/client';
import { useUser } from '~/stores/user.store';
import { UpdateUserDto } from '~/utils/models/user/update-user.dto';
import { ApiResponse } from '~/utils/interfaces/api-response';
import { plainToInstance } from 'class-transformer';
import { UserDto } from '~/utils/models/user/user.dto';

export class UserService {
  async getMe(): Promise<UserDto> {
    const user = useUser();

    const result: ApiResponse<User> = await $fetch('/api/secure/users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: user.token(),
      } as HeadersInit,
    });

    return plainToInstance(UserDto, result.data, {
      excludeExtraneousValues: true,
    });
  }

  async update(body: UpdateUserDto): Promise<UserDto> {
    const user = useUser();

    const result: ApiResponse<User> = await $fetch('/api/secure/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: user.token(),
      } as HeadersInit,
      body: JSON.stringify(plainToInstance(UpdateUserDto, body)),
    });

    return plainToInstance(UserDto, result.data, {
      excludeExtraneousValues: true,
    });
  }
}
