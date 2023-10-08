<script setup lang="ts">
const props = defineProps({ htmlString: { type: String, required: true } });

const $route = useRoute();

const html = computed(() => {
  const parser = new DOMParser();
  const html = parser.parseFromString(props.htmlString, 'text/html');
  const mentions = html.querySelectorAll('[data-type="mention"]');

  for (const mention of mentions) {
    const link = document.createElement('a');
    link.setAttribute(
      'href',
      `/projects/${$route.params.projectId}/elements/${mention.getAttribute(
        'data-id'
      )}`
    );
    link.setAttribute('class', 'link');
    link.textContent = `@${mention.getAttribute('data-label')}`;
    mention.textContent = '';
    mention.appendChild(link);
  }

  return html.body.innerHTML;
});
</script>

<template>
  <span v-html="html"></span>
</template>

<style scoped lang="scss">
@import 'assets/scss/variables';

:deep(.link) {
  color: $primary-700;
  text-decoration: inherit;
  border-bottom: 1px dashed $primary-700;
  &:hover {
    color: $primary-500;
    border-bottom-color: $primary-500;
  }
}
</style>
