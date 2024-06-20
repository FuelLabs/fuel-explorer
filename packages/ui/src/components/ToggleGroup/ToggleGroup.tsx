import { SegmentedControl as SC } from '@radix-ui/themes';
import { createComponent, withNamespace } from '../../utils/component';
import type { PropsOf } from '../../utils/types';
import { styles } from './styles';

export type ToggleGroupProps = PropsOf<typeof SC.Root>;
export type ToggleGroupItemProps = PropsOf<typeof SC.Item>;

export const ToggleGroupRoot = createComponent<
  ToggleGroupProps,
  typeof SC.Root
>({
  id: 'ToggleGroup',
  baseElement: SC.Root,
});

export const ToggleGroupItem = createComponent<
  ToggleGroupItemProps,
  typeof SC.Item
>({
  id: 'ToggleGroupItem',
  baseElement: SC.Item,
  className: ({ className }) => styles().item({ className }),
});

export const ToggleGroup = withNamespace(ToggleGroupRoot, {
  Item: ToggleGroupItem,
});
