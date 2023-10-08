<script setup lang="ts">
import { EditorContent, useEditor } from '@tiptap/vue-3';
import { Heading } from '@tiptap/extension-heading';
import { Paragraph } from '@tiptap/extension-paragraph';
import { Document } from '@tiptap/extension-document';
import { Text } from '@tiptap/extension-text';
import { Blockquote } from '@tiptap/extension-blockquote';
import { Bold } from '@tiptap/extension-bold';
import { History } from '@tiptap/extension-history';
import { Italic } from '@tiptap/extension-italic';
import { BulletList } from '@tiptap/extension-bullet-list';
import { ListItem } from '@tiptap/extension-list-item';
import { PropType } from '@vue/runtime-core';
import { InputType } from '~/utils/types/input.type';
import { Dropcursor } from '@tiptap/extension-dropcursor';
import { FileHandler } from '@tiptap-pro/extension-file-handler';
import { Editor } from '@tiptap/core';
import { Gapcursor } from '@tiptap/extension-gapcursor';
import { InvisibleCharacters } from '@tiptap-pro/extension-invisible-characters';

// TODO: https://tiptap.dev/api/nodes/mention

const $emit = defineEmits<{
  (e: 'on:update', value: string | number | undefined): void;
}>();

const props = defineProps({
  name: { type: String, required: true },
  type: { type: String as PropType<InputType>, default: 'text' },
  value: { type: String, default: '' },
});

const editor = useEditor({
  content: props.value,
  extensions: [
    Document,
    Paragraph,
    Text,
    Bold,
    Italic,
    BulletList,
    ListItem,
    Heading.configure({
      levels: [1],
    }),
    Blockquote,
    History,
    Dropcursor,
    Gapcursor,
    InvisibleCharacters,
    FileHandler.configure({
      allowedMimeTypes: ['image/png', 'image/jpeg', 'image/gif', 'image/webp'],
      onDrop: (currentEditor: Editor, files: File[], pos: number) => {
        files.forEach((file) => {
          const fileReader = new FileReader();

          fileReader.readAsDataURL(file);
          fileReader.onload = () => {
            currentEditor
              .chain()
              .insertContentAt(pos, {
                type: 'image',
                attrs: {
                  src: fileReader.result,
                },
              })
              .focus()
              .run();
          };
        });
      },
      onPaste: (currentEditor, files, htmlContent) => {
        files.forEach((file) => {
          if (htmlContent) {
            // if there is htmlContent, stop manual insertion & let other extensions handle insertion via inputRule
            // you could extract the pasted file from this url string and upload it to a server for example
            console.log(htmlContent); // eslint-disable-line no-console
            return false;
          }

          const fileReader = new FileReader();

          fileReader.readAsDataURL(file);
          fileReader.onload = () => {
            currentEditor
              .chain()
              .insertContentAt(currentEditor.state.selection.anchor, {
                type: 'image',
                attrs: {
                  src: fileReader.result,
                },
              })
              .focus()
              .run();
          };
        });
      },
    }),
  ],
  onUpdate: ({ editor }) => {
    $emit('on:update', editor.getHTML());
  },
});
</script>

<template>
  <div class="editor">
    <div v-if="editor" class="editor__menu">
      <BaseButton
        class="editor__action"
        :class="{ 'editor__action--active': editor.isActive('heading') }"
        @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
      >
        <BaseIcon icon="format_h1" />
      </BaseButton>

      <BaseButton
        class="editor__action"
        :class="{ 'editor__action--active': editor.isActive('bold') }"
        @click="editor.chain().focus().toggleBold().run()"
      >
        <BaseIcon icon="format_bold" />
      </BaseButton>

      <BaseButton
        class="editor__action"
        :class="{ 'editor__action--active': editor.isActive('italic') }"
        @click="editor.chain().focus().toggleItalic().run()"
      >
        <BaseIcon icon="format_italic" />
      </BaseButton>

      <BaseButton
        class="editor__action"
        :class="{ 'editor__action--active': editor.isActive('blockquote') }"
        @click="editor.chain().focus().toggleBlockquote().run()"
      >
        <BaseIcon icon="format_quote" />
      </BaseButton>

      <BaseButton
        :class="{ 'editor__action--active': editor.isActive('bulletList') }"
        class="editor__action"
        @click="editor.chain().focus().toggleBulletList().run()"
      >
        <BaseIcon icon="format_list_bulleted" />
      </BaseButton>
      <BaseButton
        :class="{
          'editor__action--active':
            editor.storage.invisibleCharacters.visibility(),
        }"
        class="editor__action"
        @click="editor.commands.toggleInvisibleCharacters()"
      >
        <BaseIcon icon="format_paragraph" />
      </BaseButton>
    </div>
    <EditorContent :editor="editor" />
  </div>
</template>

<style scoped lang="scss">
.editor {
  &__menu {
    display: flex;
    gap: 0.3em;
    margin-block-end: 0.3em;
  }

  &__action {
    &--active {
      background-color: gray;
    }
  }
}

:deep(.tiptap) {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 1em;
  border: 1px solid lightgrey;
  border-radius: 7px;

  &:hover,
  &:focus-visible {
    border-color: gray;
  }

  blockquote {
    border-left: 1px solid gray;
    padding-inline-start: 1em;
  }
}
</style>
