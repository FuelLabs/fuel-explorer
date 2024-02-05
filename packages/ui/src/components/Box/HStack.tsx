import { Flex as RadixFlex } from '@radix-ui/themes';

import { createPolymorphicComponent } from '../../utils/component';

import type { FlexProps } from './Flex';

export type HStackProps = Omit<FlexProps, 'direction'>;

export const HStack = createPolymorphicComponent<HStackProps, typeof RadixFlex>(
  {
    id: 'HStack',
    baseElement: RadixFlex,
    defaultProps: {
      gap: '4',
    } as FlexProps,
  },
);
