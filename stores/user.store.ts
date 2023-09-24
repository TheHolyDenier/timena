import { api } from '~/plugins/di';
import { LocalStorageService } from '~/utils/services/local-storage.service';
import { UserDto } from '~/utils/models/user/user.dto';
import { plainToInstance } from 'class-transformer';
import { UpdateUserDto } from '~/utils/models/user/update-user.dto';
import { SignInDto } from '~/utils/models/auth/sign-in.dto';

export const useUser = defineStore('user', () => {
  const localKey = 'user';
  const loading = ref(false);
  const me = ref<UserDto | null>(null);

  const recoverUser = (): UserDto | null => {
    if (me.value) return me.value;

    const textValue = LocalStorageService.get(localKey);
    me.value = textValue
      ? plainToInstance(UserDto, JSON.parse(textValue))
      : null;

    return me.value;
  };

  const token = () => {
    return me.value?.accessToken;
  };

  const getMe = async (): Promise<UserDto> => {
    if (me.value) return me.value;

    loading.value = true;
    me.value = await api.user.getMe();
    loading.value = false;

    return me.value;
  };

  const signIn = async (body: SignInDto) => {
    loading.value = true;
    me.value = await api.auth.signIn(body);
    LocalStorageService.set(localKey, JSON.stringify(me.value));
    loading.value = false;
    useRouter().replace('/');
  };

  const signUp = async (body: FormData) => {
    loading.value = true;
    me.value = await api.auth.signUp(body);
    loading.value = false;
    LocalStorageService.set(localKey, JSON.stringify(me.value));
    useRouter().replace('/');
  };

  const logout = () => {
    me.value = null;
    LocalStorageService.clearAll();
  };

  const update = async (body: UpdateUserDto) => {
    loading.value = true;
    me.value = await api.user.update(body);
    loading.value = false;

    LocalStorageService.set(localKey, JSON.stringify(me.value));
  };

  return {
    me,
    getMe,
    signIn,
    signUp,
    logout,
    update,
    recoverUser,
    token,
    loading,
  };
});
