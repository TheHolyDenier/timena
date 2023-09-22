import { AuthService } from '~/utils/services/auth.service';
import { UserService } from '~/utils/services/user.service';

export const api = {
  auth: new AuthService(),
  user: new UserService(),
};

export default defineNuxtPlugin(() => {
  return {
    provide: {
      api,
    },
  };
});
