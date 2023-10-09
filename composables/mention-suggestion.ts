import { VueRenderer } from '@tiptap/vue-3';
import MarkdownMention from '~/components/MarkdownMention.vue';
import tippy, { Instance, Props } from 'tippy.js';
import { useElement } from '~/stores/elements.store';
import { useProject } from '~/stores/project.store';
import { ElementDto } from '~/utils/models/element/element.dto';
import { MentionModel } from '~/utils/interfaces/mention-model';
import { SuggestionOptions } from '@tiptap/suggestion';

export const useMentionSuggestion = (): Partial<
  SuggestionOptions<MentionModel>
> => {
  const $element = useElement();
  const $project = useProject();

  const getElements = async (inputValue: string) => {
    const elements = await $element.get($project.selectedProject!.id);
    return (elements.data as ElementDto[])
      ?.filter((element) =>
        element.name!.toLowerCase().startsWith(inputValue.toLowerCase())
      )
      .map<MentionModel>((element) => ({
        id: element.id,
        label: element.name!,
      }))
      .slice(0, 5);
  };

  const items = async ({ query }: { query: string }) => getElements(query);

  const render = () => {
    let component: VueRenderer;
    let popup: Instance<Props>[];

    const onStart = (props: Record<string, any>) => {
      component = new VueRenderer(MarkdownMention, {
        props,
        editor: props.editor,
      });

      if (!props.clientRect) {
        return;
      }

      popup = tippy('body', {
        getReferenceClientRect: props.clientRect,
        appendTo: () => document.body,
        content: component.element,
        showOnCreate: true,
        interactive: true,
        trigger: 'manual',
        placement: 'bottom-start',
      });
    };

    const onUpdate = (props: Record<string, any>) => {
      component.updateProps(props);

      if (!props.clientRect) {
        return;
      }

      popup[0].setProps({
        getReferenceClientRect: props.clientRect,
      });
    };

    const onKeyDown = (props: Record<string, any>) => {
      if (props.event.key === 'Escape') {
        popup[0].hide();

        return true;
      }

      return component.ref?.onKeyDown(props);
    };

    const onExit = (props: Record<string, any>) => {
      popup[0].destroy();
      component.destroy();
    };

    return {
      onStart,
      onUpdate,
      onKeyDown,
      onExit,
    };
  };

  return { items, render };
};
