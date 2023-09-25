import { Badge as RadixBadge } from '@radix-ui/themes';

import { createComponent } from '../../utils/component';
import type { PropsOf } from '../../utils/types';

export type BadgeProps = PropsOf<typeof RadixBadge>;

export const Badge = createComponent<BadgeProps, typeof RadixBadge>({
  id: 'Badge',
  baseElement: RadixBadge,
});
