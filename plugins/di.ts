import { AuthService } from '~/services/auth.service';
import { UserService } from '~/services/user.service';
import { useElementService } from '~/services/elements.service';
import { useProjectService } from '~/services/project.service';

export const api = {
  auth: new AuthService(),
  user: new UserService(),
  project: useProjectService(),
  element: useElementService(),
};

export default defineNuxtPlugin(() => {
  return {
    provide: {
      api,
    },
  };
});
