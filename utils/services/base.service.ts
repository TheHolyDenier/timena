import { ClassConstructor, plainToInstance } from 'class-transformer';
import { useUser } from '~/stores/user.store';
import { ApiResponse } from '~/utils/interfaces/api-response';
import { PrismaRequest } from '~/utils/interfaces/prisma-request';
import { SearchParameters } from 'ofetch';
import { cloneDeep } from 'lodash';

export const useBaseService = <T, C = null, U = null>(
  Dto: ClassConstructor<T>,
  CreateDto?: ClassConstructor<C>,
  UpdateDto?: ClassConstructor<U>
) => {
  const parseRequest = (request: PrismaRequest): SearchParameters => {
    return cloneDeep(request);
  };

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

  const get = async (
    baseUrl: string,
    request: PrismaRequest = {}
  ): Promise<ApiResponse<T>> => {
    const user = useUser();

    const result = await $fetch<ApiResponse<T>>(baseUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: user.token(),
      } as HeadersInit,
      params: parseRequest(request),
    });

    result.data = (result.data as T[]).map((item) =>
      plainToInstance(Dto, item)
    );

    return result;
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
