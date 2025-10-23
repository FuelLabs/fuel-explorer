import { Switch as RadixSwitch } from '@radix-ui/themes';

import { createComponent } from '../../utils/component';
import type { PropsOf } from '../../utils/types';

export type SwitchProps = PropsOf<typeof RadixSwitch>;

export const Switch = createComponent<SwitchProps, typeof RadixSwitch>({
  id: 'Switch',
  baseElement: RadixSwitch,
  defaultProps: {
    radius: 'full',
    size: '1',
  },
});
