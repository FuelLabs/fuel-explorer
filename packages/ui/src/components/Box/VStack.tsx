import { Flex as RadixFlex } from '@radix-ui/themes';

import { createPolymorphicComponent } from '../../utils/component';

import type { FlexProps } from './Flex';

export type VStackProps = Omit<FlexProps, 'direction'>;

export const VStack = createPolymorphicComponent<VStackProps, typeof RadixFlex>(
  {
    id: 'VStack',
    baseElement: RadixFlex,
    defaultProps: {
      direction: 'column',
      gap: '4',
    } as FlexProps,
  },
);
