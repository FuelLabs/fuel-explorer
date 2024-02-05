import { DropdownMenu as RD } from '@radix-ui/themes';

import { createComponent, withNamespace } from '../../utils/component';
import type { PropsOf } from '../../utils/types';

export type DropdownProps = PropsOf<typeof RD.Root>;
export type DropdownTriggerProps = PropsOf<typeof RD.Trigger>;
export type DropdownContentProps = PropsOf<typeof RD.Content>;
export type DropdownLabelProps = PropsOf<typeof RD.Label>;
export type DropdownItemProps = PropsOf<typeof RD.Item>;
export type DropdownGroupProps = PropsOf<typeof RD.Group>;
export type DropdownRadioGroupProps = PropsOf<typeof RD.RadioGroup>;
export type DropdownCheckboxItemProps = PropsOf<typeof RD.CheckboxItem>;
export type DropdownSubProps = PropsOf<typeof RD.Sub>;
export type DropdownSubTriggerProps = PropsOf<typeof RD.SubTrigger>;
export type DropdownSubContentProps = PropsOf<typeof RD.SubContent>;
export type DropdownSeparatorProps = PropsOf<typeof RD.Separator>;

export const DropdownRoot = createComponent<DropdownProps, typeof RD.Root>({
  id: 'Dropdown',
  baseElement: RD.Root,
});

export const DropdownTrigger = createComponent<
  DropdownTriggerProps,
  typeof RD.Trigger
>({
  id: 'DropdownTrigger',
  baseElement: RD.Trigger,
});

export const DropdownContent = createComponent<
  DropdownContentProps,
  typeof RD.Content
>({
  id: 'DropdownContent',
  baseElement: RD.Content,
});

export const DropdownLabel = createComponent<
  DropdownLabelProps,
  typeof RD.Label
>({
  id: 'DropdownLabel',
  baseElement: RD.Label,
});

export const DropdownItem = createComponent<DropdownItemProps, typeof RD.Item>({
  id: 'DropdownItem',
  baseElement: RD.Item,
});

export const DropdownGroup = createComponent<
  DropdownGroupProps,
  typeof RD.Group
>({
  id: 'DropdownGroup',
  baseElement: RD.Group,
});

export const DropdownRadioGroup = createComponent<
  DropdownRadioGroupProps,
  typeof RD.RadioGroup
>({
  id: 'DropdownRadioGroup',
  baseElement: RD.RadioGroup,
});

export const DropdownCheckboxItem = createComponent<
  DropdownCheckboxItemProps,
  typeof RD.CheckboxItem
>({
  id: 'DropdownCheckboxItem',
  baseElement: RD.CheckboxItem,
});

export const DropdownSub = createComponent<DropdownSubProps, typeof RD.Sub>({
  id: 'DropdownSub',
  baseElement: RD.Sub,
});

export const DropdownSubContent = createComponent<
  DropdownSubContentProps,
  typeof RD.SubContent
>({
  id: 'DropdownSubContent',
  baseElement: RD.SubContent,
});

export const DropdownSubTrigger = createComponent<
  DropdownSubTriggerProps,
  typeof RD.SubTrigger
>({
  id: 'DropdownSubTrigger',
  baseElement: RD.SubTrigger,
});

export const DropdownSeparator = createComponent<
  DropdownSeparatorProps,
  typeof RD.Separator
>({
  id: 'DropdownSeparator',
  baseElement: RD.Separator,
});

export const Dropdown = withNamespace(DropdownRoot, {
  Trigger: DropdownTrigger,
  Content: DropdownContent,
  Label: DropdownLabel,
  Item: DropdownItem,
  Group: DropdownGroup,
  RadioGroup: DropdownRadioGroup,
  CheckboxItem: DropdownCheckboxItem,
  Sub: DropdownSub,
  SubTrigger: DropdownSubTrigger,
  SubContent: DropdownSubContent,
  Separator: DropdownSeparator,
});
