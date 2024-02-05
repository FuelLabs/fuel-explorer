import { Inset as RadixInset } from '@radix-ui/themes';

import { createComponent } from '../../utils/component';
import type { PropsOf } from '../../utils/types';

export type InsetProps = PropsOf<typeof RadixInset>;

export const Inset = createComponent<InsetProps, typeof RadixInset>({
  id: 'Inset',
  baseElement: RadixInset,
});
