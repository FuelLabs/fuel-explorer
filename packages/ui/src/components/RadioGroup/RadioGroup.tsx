import { RadioGroup as RG } from '@radix-ui/themes';

import { createComponent, withNamespace } from '../../utils/component';
import type { PropsOf } from '../../utils/types';

export type RadioGroupProps = PropsOf<typeof RG.Root>;
export type RadioGroupItemProps = PropsOf<typeof RG.Item>;

export const RadioGroupRoot = createComponent<RadioGroupProps, typeof RG.Root>({
  id: 'RadioGroup',
  baseElement: RG.Root,
});

export const RadioGroupItem = createComponent<
  RadioGroupItemProps,
  typeof RG.Item
>({
  id: 'RadioGroupItem',
  baseElement: RG.Item,
});

export const RadioGroup = withNamespace(RadioGroupRoot, {
  Root: RadioGroupRoot,
  Item: RadioGroupItem,
});
