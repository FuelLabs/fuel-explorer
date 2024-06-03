import { TextField as RT } from '@radix-ui/themes';

import { NumericFormat } from 'react-number-format';
import type { NumericFormatProps } from 'react-number-format';

import { createComponent, withNamespace } from '../../utils/component';
import type { PropsOf } from '../../utils/types';

export type InputProps = PropsOf<typeof RT.Root>;
export type InputSlotProps = PropsOf<typeof RT.Slot>;
export type InputNumberProps = Omit<NumericFormatProps, 'color' | 'size'>;

export const InputRoot = createComponent<InputProps, typeof RT.Root>({
  id: 'Input',
  baseElement: RT.Root,
});

export const InputSlot = createComponent<InputSlotProps, typeof RT.Slot>({
  id: 'InputSlot',
  baseElement: RT.Slot,
});

export const InputNumber = createComponent<
  InputNumberProps,
  typeof NumericFormat
>({
  id: 'InputNumber',
  baseElement: NumericFormat,
  render: (Root, props) => {
    return <Root {...props} customInput={InputRoot} />;
  },
});

export const Input = withNamespace(InputRoot, {
  Slot: InputSlot,
  Number: InputNumber,
});
