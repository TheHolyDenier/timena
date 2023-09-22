import { User } from '.prisma/client';
import { SignInDto } from '~/models/auth/sign-in.dto';
import { api } from '~/plugins/di';
import { LocalStorageService } from '~/services/local-storage.service';
import { UpdateUserDto } from '~/models/users/update-user.dto';
import { FormDataInterface } from '~/interfaces/form-data.interface';

export const useUser = defineStore('user', () => {
  const localKey = 'accessToken';

  const me = ref<User | null>(null);

  const token = (): string => {
    return LocalStorageService.get(localKey)!;
  };

  const isAuthenticated = (): boolean => {
    return !!token();
  };

  const getMe = async (): Promise<User> => {
    if (me.value) return me.value;

    const user = await api.user.getMe();
    me.value = user;

    return user;
  };
  const signIn = async (body: SignInDto) => {
    me.value = await api.auth.signIn(body);
    LocalStorageService.set(localKey, me.value.accessToken!);
  };

  const signUp = async (body: FormDataInterface) => {
    me.value = await api.auth.signUp(body);
    LocalStorageService.set(localKey, me.value.accessToken!);
  };

  const logout = () => {
    me.value = null;
    LocalStorageService.clearAll();
  };

  const update = async (body: UpdateUserDto) => {
    me.value = await api.user.update(body);
  };

  return { me, token, isAuthenticated, getMe, signIn, signUp, logout, update };
});
