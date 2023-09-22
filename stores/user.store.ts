import { User } from '.prisma/client';
import { SignInDto } from '~/domain/auth/sign-in.dto';
import { api } from '~/plugins/di';
import { LocalStorageService } from '~/utils/services/local-storage.service';
import { UpdateUserDto } from '~/domain/users/update-user.dto';
import { FormDataInterface } from '~/interfaces/form-data.interface';
import { UserDto } from '~/utils/models/user/user.dto';
import { plainToInstance } from 'class-transformer';

export const useUser = defineStore('user', () => {
  const localKey = 'user';

  const me = ref<UserDto | null>(null);

  const recoverUser = (): UserDto | null => {
    if (me.value) return me.value;

    const textValue = LocalStorageService.get(localKey);
    me.value = textValue
      ? plainToInstance(UserDto, JSON.parse(textValue))
      : null;

    return me.value;
  };

  const getMe = async (): Promise<User> => {
    if (me.value) return me.value;

    const user = await api.user.getMe();
    me.value = user;

    return user;
  };

  const signIn = async (body: SignInDto) => {
    me.value = await api.auth.signIn(body);
    LocalStorageService.set(localKey, JSON.stringify(me.value));
    useRouter().replace('/');
  };

  const signUp = async (body: FormDataInterface) => {
    me.value = await api.auth.signUp(body);
    LocalStorageService.set(localKey, JSON.stringify(me.value));
    useRouter().replace('/');
  };

  const logout = () => {
    me.value = null;
    LocalStorageService.clearAll();
  };

  const update = async (body: UpdateUserDto) => {
    me.value = await api.user.update(body);
    LocalStorageService.set(localKey, JSON.stringify(me.value));
  };

  return { me, getMe, signIn, signUp, logout, update, recoverUser };
});
