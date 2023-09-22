import { ContextMenu as RC } from '@radix-ui/themes';

import { createComponent, withNamespace } from '../../utils/component';
import type { PropsOf } from '../../utils/types';

export type ContextMenuProps = PropsOf<typeof RC.Root>;
export type ContextMenuTriggerProps = PropsOf<typeof RC.Trigger>;
export type ContextMenuContentProps = PropsOf<typeof RC.Content>;
export type ContextMenuLabelProps = PropsOf<typeof RC.Label>;
export type ContextMenuItemProps = PropsOf<typeof RC.Item>;
export type ContextMenuGroupProps = PropsOf<typeof RC.Group>;
export type ContextMenuRadioGroupProps = PropsOf<typeof RC.RadioGroup>;
export type ContextMenuCheckboxItemProps = PropsOf<typeof RC.CheckboxItem>;
export type ContextMenuSubProps = PropsOf<typeof RC.Sub>;
export type ContextMenuSubTriggerProps = PropsOf<typeof RC.SubTrigger>;
export type ContextMenuSubContentProps = PropsOf<typeof RC.SubContent>;
export type ContextMenuSeparatorProps = PropsOf<typeof RC.Separator>;

export const ContextMenuRoot = createComponent<
  ContextMenuProps,
  typeof RC.Root
>({
  id: 'ContextMenu',
  baseElement: RC.Root,
});

export const ContextMenuTrigger = createComponent<
  ContextMenuTriggerProps,
  typeof RC.Trigger
>({
  id: 'ContextMenuTrigger',
  baseElement: RC.Trigger,
});

export const ContextMenuContent = createComponent<
  ContextMenuContentProps,
  typeof RC.Content
>({
  id: 'ContextMenuContent',
  baseElement: RC.Content,
});

export const ContextMenuLabel = createComponent<
  ContextMenuLabelProps,
  typeof RC.Label
>({
  id: 'ContextMenuLabel',
  baseElement: RC.Label,
});

export const ContextMenuItem = createComponent<
  ContextMenuItemProps,
  typeof RC.Item
>({
  id: 'ContextMenuItem',
  baseElement: RC.Item,
});

export const ContextMenuGroup = createComponent<
  ContextMenuGroupProps,
  typeof RC.Group
>({
  id: 'ContextMenuGroup',
  baseElement: RC.Group,
});

export const ContextMenuRadioGroup = createComponent<
  ContextMenuRadioGroupProps,
  typeof RC.RadioGroup
>({
  id: 'ContextMenuRadioGroup',
  baseElement: RC.RadioGroup,
});

export const ContextMenuCheckboxItem = createComponent<
  ContextMenuCheckboxItemProps,
  typeof RC.CheckboxItem
>({
  id: 'ContextMenuCheckboxItem',
  baseElement: RC.CheckboxItem,
});

export const ContextMenuSub = createComponent<
  ContextMenuSubProps,
  typeof RC.Sub
>({
  id: 'ContextMenuSub',
  baseElement: RC.Sub,
});

export const ContextMenuSubContent = createComponent<
  ContextMenuSubContentProps,
  typeof RC.SubContent
>({
  id: 'ContextMenuSubContent',
  baseElement: RC.SubContent,
});

export const ContextMenuSubTrigger = createComponent<
  ContextMenuSubTriggerProps,
  typeof RC.SubTrigger
>({
  id: 'ContextMenuSubTrigger',
  baseElement: RC.SubTrigger,
});

export const ContextMenuSeparator = createComponent<
  ContextMenuSeparatorProps,
  typeof RC.Separator
>({
  id: 'ContextSeparator',
  baseElement: RC.Separator,
});

export const ContextMenu = withNamespace(ContextMenuRoot, {
  Trigger: ContextMenuTrigger,
  Content: ContextMenuContent,
  Label: ContextMenuLabel,
  Item: ContextMenuItem,
  Group: ContextMenuGroup,
  RadioGroup: ContextMenuRadioGroup,
  CheckboxItem: ContextMenuCheckboxItem,
  Sub: ContextMenuSub,
  SubTrigger: ContextMenuSubTrigger,
  SubContent: ContextMenuSubContent,
  Separator: ContextMenuSeparator,
});
