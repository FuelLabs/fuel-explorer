import { HoverCard as RH } from '@radix-ui/themes';

import { createComponent, withNamespace } from '../../utils/component';
import type { PropsOf } from '../../utils/types';

export type HoverCardProps = PropsOf<typeof RH.Root>;
export type HoverCardTriggerProps = PropsOf<typeof RH.Trigger>;
export type HoverCardContentProps = PropsOf<typeof RH.Content>;

export const HoverCardRoot = createComponent<HoverCardProps, typeof RH.Root>({
  id: 'HoverCard',
  baseElement: RH.Root,
});

export const HoverCardTrigger = createComponent<
  HoverCardTriggerProps,
  typeof RH.Trigger
>({
  id: 'HoverCardTrigger',
  baseElement: RH.Trigger,
});

export const HoverCardContent = createComponent<
  HoverCardContentProps,
  typeof RH.Content
>({
  id: 'HoverCardContent',
  baseElement: RH.Content,
});

export const HoverCard = withNamespace(HoverCardRoot, {
  Trigger: HoverCardTrigger,
  Content: HoverCardContent,
});
