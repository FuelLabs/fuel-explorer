import { Flex as RadixFlex } from '@radix-ui/themes';

import { createPolymorphicComponent } from '../../utils/component';
import type { PropsOf, WithAsProps } from '../../utils/types';

export type FlexProps = WithAsProps & PropsOf<typeof RadixFlex>;

export const Flex = createPolymorphicComponent<FlexProps, typeof RadixFlex>({
  id: 'Flex',
  baseElement: RadixFlex,
});
