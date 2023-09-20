import { TextField as RT } from '@radix-ui/themes';
import { createComponent, withNamespace } from '~/utils/component';
import type { PropsOf } from '~/utils/types';

export type InputProps = PropsOf<typeof RT.Root>;
export type InputSlotProps = PropsOf<typeof RT.Slot>;
export type InputFieldProps = PropsOf<typeof RT.Input>;
export type InputPasswordProps = Omit<PropsOf<typeof RT.Input>, 'type'>;

export const InputRoot = createComponent<InputProps, typeof RT.Root>({
  id: 'Input',
  baseElement: RT.Root,
});

export const InputSlot = createComponent<InputSlotProps, typeof RT.Slot>({
  id: 'InputSlot',
  baseElement: RT.Slot,
});

export const InputField = createComponent<InputFieldProps, typeof RT.Input>({
  id: 'InputField',
  baseElement: RT.Input,
});

export const Input = withNamespace(InputRoot, {
  Slot: InputSlot,
  Field: InputField,
});
