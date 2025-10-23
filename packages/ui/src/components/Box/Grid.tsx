import { Grid as RadixGrid } from '@radix-ui/themes';

import { createPolymorphicComponent } from '../../utils/component';
import type { PropsOf, WithAsProps } from '../../utils/types';

export type GridProps = WithAsProps & PropsOf<typeof RadixGrid>;

export const Grid = createPolymorphicComponent<GridProps, typeof RadixGrid>({
  id: 'Grid',
  baseElement: RadixGrid,
});
