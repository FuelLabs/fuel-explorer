import { Box as RadixBox } from '@radix-ui/themes';

import { createPolymorphicComponent } from '../../utils/component';
import type { PropsOf, WithAsProps } from '../../utils/types';

export type BoxProps = WithAsProps & PropsOf<typeof RadixBox>;

export const Box = createPolymorphicComponent<BoxProps, typeof RadixBox>({
  id: 'Box',
  baseElement: RadixBox,
});
