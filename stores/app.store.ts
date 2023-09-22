export const useApp = defineStore('app', () => {
  const drawerExpanded = ref<boolean>(false);

  const toggleDrawer = () => (drawerExpanded.value = !drawerExpanded.value);

  return { drawerExpanded, toggleDrawer };
});
