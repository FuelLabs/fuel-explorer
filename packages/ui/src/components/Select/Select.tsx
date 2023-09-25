import { Select as RS } from '@radix-ui/themes';

import { createComponent, withNamespace } from '../../utils/component';
import type { PropsOf } from '../../utils/types';

export type SelectProps = PropsOf<typeof RS.Root>;
export type SelectTriggerProps = PropsOf<typeof RS.Trigger>;
export type SelectContentProps = PropsOf<typeof RS.Content>;
export type SelectLabelProps = PropsOf<typeof RS.Label>;
export type SelectItemProps = PropsOf<typeof RS.Item> & PropsOf<'option'>;
export type SelectGroupProps = PropsOf<typeof RS.Group>;
export type SelectSeparatorProps = PropsOf<typeof RS.Separator>;

export const SelectRoot = createComponent<SelectProps, typeof RS.Root>({
  id: 'Select',
  baseElement: RS.Root,
});

export const SelectTrigger = createComponent<
  SelectTriggerProps,
  typeof RS.Trigger
>({
  id: 'SelectTrigger',
  baseElement: RS.Trigger,
});

export const SelectContent = createComponent<
  SelectContentProps,
  typeof RS.Content
>({
  id: 'SelectContent',
  baseElement: RS.Content,
});

export const SelectLabel = createComponent<SelectLabelProps, typeof RS.Label>({
  id: 'SelectLabel',
  baseElement: RS.Label,
});

export const SelectItem = createComponent<SelectItemProps, typeof RS.Item>({
  id: 'SelectItem',
  baseElement: RS.Item,
});

export const SelectGroup = createComponent<SelectGroupProps, typeof RS.Group>({
  id: 'SelectGroup',
  baseElement: RS.Group,
});

export const SelectSeparator = createComponent<
  SelectSeparatorProps,
  typeof RS.Separator
>({
  id: 'SelectSeparator',
  baseElement: RS.Separator,
});

export const Select = withNamespace(SelectRoot, {
  Trigger: SelectTrigger,
  Content: SelectContent,
  Label: SelectLabel,
  Item: SelectItem,
  Group: SelectGroup,
  Separator: SelectSeparator,
});
