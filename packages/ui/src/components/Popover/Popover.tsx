import { Popover as RP } from '@radix-ui/themes';

import { createComponent, withNamespace } from '../../utils/component';
import type { PropsOf } from '../../utils/types';

export type PopoverProps = PropsOf<typeof RP.Root>;
export type PopoverTriggerProps = PropsOf<typeof RP.Trigger>;
export type PopoverContentProps = PropsOf<typeof RP.Content>;
export type PopoverCloseProps = PropsOf<typeof RP.Close>;

export const PopoverRoot = createComponent<PopoverProps, typeof RP.Root>({
  id: 'Popover',
  baseElement: RP.Root,
});

export const PopoverTrigger = createComponent<
  PopoverTriggerProps,
  typeof RP.Trigger
>({
  id: 'PopoverTrigger',
  baseElement: RP.Trigger,
});

export const PopoverContent = createComponent<
  PopoverContentProps,
  typeof RP.Content
>({
  id: 'PopoverContent',
  baseElement: RP.Content,
});

export const PopoverClose = createComponent<PopoverCloseProps, typeof RP.Close>(
  {
    id: 'PopoverClose',
    baseElement: RP.Close,
  },
);

export const Popover = withNamespace(PopoverRoot, {
  Trigger: PopoverTrigger,
  Content: PopoverContent,
  Close: PopoverClose,
});
