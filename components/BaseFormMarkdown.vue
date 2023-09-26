<script setup lang="ts">
import { EditorContent, useEditor } from '@tiptap/vue-3';
import Heading from '@tiptap/extension-heading';
import Paragraph from '@tiptap/extension-paragraph';
import Document from '@tiptap/extension-document';
import Text from '@tiptap/extension-text';

const editor = useEditor({
  content: '<p>I’m running Tiptap with Vue.js. 🎉</p>',
  extensions: [
    Document,
    Paragraph,
    Text,
    Heading.configure({
      levels: [1, 2, 3],
    }),
  ],
});

const modelValue = ref('');

onBeforeUnmount(() => editor.destroy());
</script>

<template>
  <EditorContent v-model="modelValue" :editor="editor" />
</template>

<style scoped lang="scss">
:deep(.tiptap) {
}
</style>
