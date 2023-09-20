import * as AC from '@radix-ui/react-accordion';
import { IconChevronDown } from '@tabler/icons-react';
import { createComponent, withNamespace } from '~/utils/component';
import type { PropsOf } from '~/utils/types';

import { Icon } from '../Icon/Icon';

export type AccordionProps = PropsOf<typeof AC.Root>;
export type AccordionContentProps = PropsOf<typeof AC.Content>;
export type AccordionItemProps = PropsOf<typeof AC.Item>;
export type AccordionHeaderProps = PropsOf<typeof AC.Header>;
export type AccordionTriggerProps = PropsOf<typeof AC.Trigger>;

export const AccordionRoot = createComponent<AccordionProps, typeof AC.Root>({
  id: 'Accordion',
  baseElement: AC.Root,
});

export const AccordionContent = createComponent<
  AccordionContentProps,
  typeof AC.Content
>({
  id: 'AccordionContent',
  baseElement: AC.Content,
});

export const AccordionItem = createComponent<
  AccordionItemProps,
  typeof AC.Item
>({
  id: 'AccordionItem',
  baseElement: AC.Item,
});

export const AccordionHeader = createComponent<
  AccordionHeaderProps,
  typeof AC.Header
>({
  id: 'AccordionHeader',
  baseElement: AC.Header,
});

export const AccordionTrigger = createComponent<
  AccordionTriggerProps,
  typeof AC.Trigger
>({
  id: 'AccordionTrigger',
  baseElement: AC.Trigger,
  render: (Comp, { children, ...props }) => {
    return (
      <AccordionHeader>
        <Comp {...props}>
          {children}
          <Icon
            icon={IconChevronDown}
            className="fuel-AccordionIcon text-icon"
          />
        </Comp>
      </AccordionHeader>
    );
  },
});

export const Accordion = withNamespace(AccordionRoot, {
  Item: AccordionItem,
  Content: AccordionContent,
  Trigger: AccordionTrigger,
});
