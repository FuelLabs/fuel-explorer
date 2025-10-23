import { TextField as RT } from '@radix-ui/themes';

import { createComponent, withNamespace } from '../../utils/component';
import type { PropsOf } from '../../utils/types';

export type InputProps = PropsOf<typeof RT.Root>;
export type InputSlotProps = PropsOf<typeof RT.Slot>;

export const InputRoot = createComponent<InputProps, typeof RT.Root>({
  id: 'Input',
  baseElement: RT.Root,
});

export const InputSlot = createComponent<InputSlotProps, typeof RT.Slot>({
  id: 'InputSlot',
  baseElement: RT.Slot,
});

export const Input = withNamespace(InputRoot, {
  Slot: InputSlot,
});
