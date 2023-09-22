import { Avatar as RadixAvatar } from '@radix-ui/themes';

import { createComponent } from '../../utils/component';
import type { PropsOf } from '../../utils/types';

export type AvatarProps = PropsOf<typeof RadixAvatar>;

export const Avatar = createComponent<AvatarProps, typeof RadixAvatar>({
  id: 'Avatar',
  baseElement: RadixAvatar,
  defaultProps: {
    radius: 'full',
  },
});
