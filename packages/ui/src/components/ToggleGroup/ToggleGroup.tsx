import * as TG from '@radix-ui/react-toggle-group';

import { tv } from 'tailwind-variants';
import { createComponent, withNamespace } from '../../utils/component';
import type { PropsOf } from '../../utils/types';

export type ToggleGroupProps = PropsOf<typeof TG.Root>;
export type ToggleGroupItemProps = PropsOf<typeof TG.Item>;

export const ToggleGroupRoot = createComponent<
  ToggleGroupProps,
  typeof TG.Root
>({
  id: 'ToggleGroup',
  className: ({ className }) => styles().root({ className }),
  baseElement: TG.Root,
});

export const ToggleGroupItem = createComponent<
  ToggleGroupItemProps,
  typeof TG.Item
>({
  id: 'ToggleGroupItem',
  className: ({ className }) => styles().item({ className }),
  baseElement: TG.Item,
});

export const ToggleGroup = withNamespace(ToggleGroupRoot, {
  Item: ToggleGroupItem,
});

export const styles = tv({
  slots: {
    root: 'inline-flex bg-card-bg border border-border p-2 rounded-sm items-center gap-1',
    item: [
      'flex-1 h-7 flex items-center justify-center rounded-sm px-2 text-sm text-muted',
      'dark-theme:state-on:bg-gray-5 light-theme:state-on:bg-gray-3 state-on:text-heading',
      'focus-visible:z-10 focus-visible:shadow-[0_0_0_2px] focus-visible:shadow-accent focus-visible:outline-none',
    ],
  },
});
