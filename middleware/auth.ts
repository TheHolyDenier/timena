import { useUser } from '~/stores/user.store';

export default defineNuxtRouteMiddleware(() => {
  const user = useUser();

  if (process.client && !user.isAuthenticated()) {
    return navigateTo('/');
  }
});
