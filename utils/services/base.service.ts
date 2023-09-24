import { ClassConstructor, plainToInstance } from 'class-transformer';
import { useUser } from '~/stores/user.store';
import { ApiResponse } from '~/utils/interfaces/api-response';

export const useBaseService = <T, C = null, U = null>(
  Dto: ClassConstructor<T>,
  CreateDto?: ClassConstructor<C>,
  UpdateDto?: ClassConstructor<U>
) => {
  const create = CreateDto
    ? async (baseUrl: string, body: C): Promise<T> => {
        const user = useUser();

        const result = await $fetch(baseUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: user.token(),
          } as HeadersInit,
          body: JSON.stringify(
            plainToInstance(CreateDto, body, {
              excludeExtraneousValues: true,
            })
          ),
        });

        return plainToInstance(Dto, (result as ApiResponse<T>).data);
      }
    : null;

  const update = UpdateDto
    ? async (baseUrl: string, body: U): Promise<T> => {
        const user = useUser();

        const result = await $fetch(baseUrl, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: user.token(),
          } as HeadersInit,
          body: JSON.stringify(
            plainToInstance(UpdateDto, body, {
              excludeExtraneousValues: true,
            })
          ),
        });

        return plainToInstance(Dto, (result as ApiResponse<T>).data);
      }
    : null;

  const get = async (baseUrl: string): Promise<T[]> => {
    const user = useUser();

    const result = await $fetch(baseUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: user.token(),
      } as HeadersInit,
    });

    return ((result as ApiResponse<T>).data as T[]).map((item) =>
      plainToInstance(Dto, item)
    );
  };

  const getOne = async (baseUrl: string): Promise<T> => {
    const user = useUser();

    const result = await $fetch(baseUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: user.token(),
      } as HeadersInit,
    });

    return plainToInstance(Dto, (result as ApiResponse<T>).data);
  };

  const remove = async (baseUrl: string): Promise<void> => {
    const user = useUser();

    await $fetch(baseUrl, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: user.token(),
      } as HeadersInit,
    });
  };

  return { create, remove, update, getOne, get };
};
