import { AuthService } from '~/utils/services/auth.service';

export const api = {
  auth: new AuthService(),
};

export default defineNuxtPlugin(() => {
  return {
    provide: {
      api,
    },
  };
});
