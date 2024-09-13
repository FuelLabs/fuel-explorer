import { Separator as RadixSeparator } from '@radix-ui/themes';

import { createComponent } from '../../utils/component';
import type { PropsOf } from '../../utils/types';

export type SeparatorProps = PropsOf<typeof RadixSeparator>;

export const Separator = createComponent<SeparatorProps, typeof RadixSeparator>(
  {
    id: 'Separator',
    baseElement: RadixSeparator,
    defaultProps: {
      orientation: 'horizontal',
    },
  },
);
