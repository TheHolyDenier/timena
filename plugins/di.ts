import { AuthService } from '~/utils/services/auth.service';
import { UserService } from '~/utils/services/user.service';
import { useProjectService } from '~/utils/services/project.service';

export const api = {
  auth: new AuthService(),
  user: new UserService(),
  project: useProjectService(),
};

export default defineNuxtPlugin(() => {
  return {
    provide: {
      api,
    },
  };
});
