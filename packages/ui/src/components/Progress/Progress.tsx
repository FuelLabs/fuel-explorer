import { Progress as RadixProgress } from '@radix-ui/themes';

import { createComponent } from '../../utils/component';
import type { PropsOf } from '../../utils/types';

export type ProgressProps = PropsOf<typeof RadixProgress>;

export const Progress = createComponent<ProgressProps, typeof RadixProgress>({
  id: 'Progress',
  baseElement: RadixProgress,
});
