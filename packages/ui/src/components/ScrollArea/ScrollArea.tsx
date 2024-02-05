import { ScrollArea as RadixScrollArea } from '@radix-ui/themes';

import { createComponent } from '../../utils/component';
import type { PropsOf } from '../../utils/types';

export type ScrollAreaProps = PropsOf<typeof RadixScrollArea>;

export const ScrollArea = createComponent<
  ScrollAreaProps,
  typeof RadixScrollArea
>({
  id: 'ScrollArea',
  baseElement: RadixScrollArea,
});
