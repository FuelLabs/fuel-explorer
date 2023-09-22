import { Container as RadixContainer } from '@radix-ui/themes';

import { createPolymorphicComponent } from '../../utils/component';
import type { PropsOf, WithAsProps } from '../../utils/types';

export type ContainerProps = WithAsProps & PropsOf<typeof RadixContainer>;

export const Container = createPolymorphicComponent<
  ContainerProps,
  typeof RadixContainer
>({
  id: 'Container',
  baseElement: RadixContainer,
});
