import { Tooltip as RadixTooltip } from '@radix-ui/themes';

import { createComponent } from '../../utils/component';
import type { PropsOf } from '../../utils/types';

export type TooltipProps = PropsOf<typeof RadixTooltip>;

export const Tooltip = createComponent<TooltipProps, typeof RadixTooltip>({
  id: 'Tooltip',
  baseElement: RadixTooltip,
});
