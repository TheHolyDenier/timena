import { useRoute } from 'vue-router';

export const useSidebar = () => {
  const $route = useRoute();
  const $router = useRouter();

  const isOpen = computed(() => !!$route.query.sidebar);

  const open = () => {
    const query = Object.assign({}, $route.query, { sidebar: 'true' });
    return $router.replace({
      name: String($route.name),
      params: $route.params,
      query
    });
  };

  const close = () => {
    const query = Object.assign({}, $route.query);
    delete query.sidebar;
    return $router.replace({
      name: String($route.name),
      params: $route.params,
      query
    });
  };

  return { close, open, isOpen };
};
