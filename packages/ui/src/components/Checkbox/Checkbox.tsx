import { Checkbox as RadixCheckbox } from '@radix-ui/themes';

import { createComponent } from '../../utils/component';
import type { PropsOf } from '../../utils/types';

export type CheckboxProps = PropsOf<typeof RadixCheckbox>;

export const Checkbox = createComponent<CheckboxProps, typeof RadixCheckbox>({
  id: 'Checkbox',
  baseElement: RadixCheckbox,
});
