import * as AC from '@radix-ui/react-accordion';
import { IconChevronDown } from '@tabler/icons-react';

import { createComponent, withNamespace } from '../../utils/component';
import type { PropsOf } from '../../utils/types';
import { Icon } from '../Icon/Icon';

import { styles } from './styles';

export type AccordionProps = PropsOf<typeof AC.Root>;
export type AccordionContentProps = PropsOf<typeof AC.Content>;
export type AccordionItemProps = PropsOf<typeof AC.Item>;
export type AccordionHeaderProps = PropsOf<typeof AC.Header>;
export type AccordionTriggerProps = PropsOf<typeof AC.Trigger>;

export const AccordionRoot = createComponent<AccordionProps, typeof AC.Root>({
  id: 'Accordion',
  className: ({ className }) => styles().root({ className }),
  baseElement: AC.Root,
});

export const AccordionContent = createComponent<
  AccordionContentProps,
  typeof AC.Content
>({
  id: 'AccordionContent',
  className: ({ className }) => styles().content({ className }),
  baseElement: AC.Content,
});

export const AccordionItem = createComponent<
  AccordionItemProps,
  typeof AC.Item
>({
  id: 'AccordionItem',
  className: ({ className }) => styles().item({ className }),
  baseElement: AC.Item,
});

export const AccordionHeader = createComponent<
  AccordionHeaderProps,
  typeof AC.Header
>({
  id: 'AccordionHeader',
  className: ({ className }) => styles().header({ className }),
  baseElement: AC.Header,
});

export const AccordionTrigger = createComponent<
  AccordionTriggerProps,
  typeof AC.Trigger
>({
  id: 'AccordionTrigger',
  baseElement: AC.Trigger,
  render: (Comp, { children, className, ...props }) => {
    const classes = styles();
    return (
      <AccordionHeader>
        <Comp {...props} className={classes.trigger({ className })}>
          {children}
          <Icon className={classes.icon()} icon={IconChevronDown} />
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
